var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const catchError = require("../lib/catch-error");
const { getBooks, getBooksIncludeGenre } = require("../lib/books-query");
const { validateStringParamIsInt } = require('../utils/general-utils');
const { validateFilterByGenre } = require('./helper-functions/validate-filter-by-genre-param');
const { MIN_ROWS, MAX_ROWS } = require('../utils/constants/query-results-rows-limit-const');

router.get('/', catchError(async (req, res, next) => {
  let totalRows = req.query.total_rows
  let rowsLimitParam = 10;
  if (totalRows && validateStringParamIsInt({ value: totalRows, minInt: MIN_ROWS, maxInt: MAX_ROWS })) {
    rowsLimitParam = parseInt(totalRows, 10);
  }

  let filterByGenre = req.query.genre;

  if (filterByGenre) {
    filterByGenre = validateFilterByGenre(filterByGenre);
    console.log(filterByGenre)

    let result = await getBooksIncludeGenre(rowsLimitParam, filterByGenre);
    res.json(result.rows);
  } else {
    let result = await getBooks(rowsLimitParam);
    res.json(result.rows);
  }
}));


module.exports = router;
