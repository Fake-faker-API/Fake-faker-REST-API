var express = require('express');
var router = express.Router();
const catchError = require("../lib/catch-error");
const { getProducts } = require('../lib/products-query');
const { validateStringParamIsInt } = require('../utils/general-utils');
const { MIN_ROWS, MAX_ROWS } = require('../utils/constants/query-results-rows-limit-const');

router.get('/', catchError(async (req, res, next) => {
  let totalRows = req.query.total_rows
  let rowsLimitParam = 10;
  if (totalRows && validateStringParamIsInt({ value: totalRows, minInt: MIN_ROWS, maxInt: MAX_ROWS })) {
    rowsLimitParam = parseInt(totalRows, 10);
  }
    let result = await getProducts(rowsLimitParam);
    res.json(result.rows);
}));

module.exports = router;
