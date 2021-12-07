const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const requestIP = require('request-ip');
const nodeCache = require('node-cache');
const isIp = require('is-ip');
var moesif = require('moesif-nodejs');

const { ipMiddleware } = require('./middleware/rateLimiting')
const { options } = require('./middleware/moesif');

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

const moesifMiddleware = moesif(options);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const IPCache = new nodeCache({ stdTTL: TIME_FRAME_IN_S, deleteOnExpire: false, checkperiod: TIME_FRAME_IN_S });

app.use(moesifMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/docs', indexRouter);
app.use('/users', ipMiddleware(IPCache), usersRouter);
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
