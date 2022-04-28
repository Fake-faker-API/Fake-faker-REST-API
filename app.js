const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const moesif = require('moesif-nodejs');

const { rateLimiter } = require('./middleware/rateLimiter');
const { options } = require('./middleware/moesif');

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const companiesRouter = require('./routes/companies');
const addressesRouter = require('./routes/addresses');
const booksRouter = require('./routes/books');
const moviesRouter = require('./routes/movies');

const app = express();
const moesifMiddleware = moesif(options);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(moesifMiddleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/users', rateLimiter, usersRouter);
app.use('/api/v1/products', rateLimiter, productsRouter);
app.use('/api/v1/companies', rateLimiter, companiesRouter);
app.use('/api/v1/addresses', rateLimiter, addressesRouter);
app.use('/api/v1/books', rateLimiter, booksRouter);
app.use('/api/v1/movies', rateLimiter, moviesRouter);

app.use('/', function(req, res, next) {
  next(createError(404));
});
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
