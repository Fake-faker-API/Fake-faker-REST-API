var express = require('express');
var router = express.Router();
const path = require('path');
const catchError = require("../lib/catch-error");

router.get('/', catchError((req, res, next) => {
  res.redirect('/docs');
}));

router.get('/docs', catchError((req, res, next) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/doc') });
}));


module.exports = router;
