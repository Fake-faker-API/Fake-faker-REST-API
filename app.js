const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const requestIP = require('request-ip');
const nodeCache = require('node-cache');
const isIp = require('is-ip');
var moesif = require('moesif-nodejs');
const config = require("./lib/config");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const companiesRouter = require('./routes/companies');
const addressesRouter = require('./routes/addresses');
const booksRouter = require('./routes/books');
const moviesRouter = require('./routes/movies');

const {
  TIME_FRAME_IN_S,
  TIME_FRAME_IN_MS,
  MS_TO_S,
  RPS_LIMIT
} = require('./utils/constants/rate-limiting-const');

// config.DATABASE_URL

const options = {

  applicationId: config.MOESIF_APPLICATION_ID,

  logBody: true,

  identifyUser: function (req, res) {
    if (req.user) {
      return req.user.id;
    }
    return undefined;
  },

  getSessionToken: function (req, res) {
    return req.headers['Authorization'];
  }
};

var moesifMiddleware = moesif(options);

const IPCache = new nodeCache({ stdTTL: TIME_FRAME_IN_S, deleteOnExpire: false, checkperiod: TIME_FRAME_IN_S });
IPCache.on('expired', (key, value) => {
  if (new Date() - value[value.length - 1] > TIME_FRAME_IN_MS) {
      IPCache.del(key);
  } else {
    const updatedValue = value.filter(function (element) {
        return new Date() - element < TIME_FRAME_IN_MS;
    });
    IPCache.set(key, updatedValue, TIME_FRAME_IN_S - (new Date() - updatedValue[0]) * MS_TO_S);
}
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const ipMiddleware = async function (req, res, next) {
  let clientIP = requestIP.getClientIp(req);
  if (isIp.v6(clientIP)) {
      clientIP = clientIP.split(':').splice(0, 4).join(':') + '::/64';
  }

  updateCache(clientIP);
  console.log('=>', clientIP);
  const IPArray = IPCache.get(clientIP);
  if (IPArray.length > 1) {
      const rps = IPArray.length / ((IPArray[IPArray.length - 1] - IPArray[0]) * MS_TO_S);
      if (rps > RPS_LIMIT) {
          console.log('You are hitting limit', clientIP);
          res.status(429).send('Too many requests');
          return;
      }
  }
  next();
};

const updateCache = (ip) => {
  let IPArray = IPCache.get(ip) || [];
  IPArray.push(new Date());
  IPCache.set(ip, IPArray, (IPCache.getTtl(ip) - Date.now()) * MS_TO_S || TIME_FRAME_IN_S);
};

app.use(moesifMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/docs', indexRouter);
app.use('/users', ipMiddleware, usersRouter);
app.use('/products', ipMiddleware, productsRouter);
app.use('/companies', ipMiddleware, companiesRouter);
app.use('/addresses', ipMiddleware, addressesRouter);
app.use('/books', ipMiddleware, booksRouter);
app.use('/movies', ipMiddleware, moviesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
