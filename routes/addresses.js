var express = require('express');
var router = express.Router();
const catchError = require("../lib/catch-error");
const { getAddresses, getAddressesIncludeState } = require('../lib/addresses-query');
const { validateStringParamIsInt } = require('../utils/general-utils');
const { MIN_ROWS, MAX_ROWS } = require('../utils/constants/query-results-rows-limit-const');
const { validateFilterByState } = require('./helper-functions/validate-filter-by-state-param')

router.get('/', catchError(async (req, res, next) => {
  let totalRows = req.query.total_rows
  let rowsLimitParam = 10;
  if (totalRows && validateStringParamIsInt({ value: totalRows, minInt: MIN_ROWS, maxInt: MAX_ROWS })) {
    rowsLimitParam = parseInt(totalRows, 10);
  }

  let filterByState = req.query.state; // state could be a string or an array of strings
  
  if (filterByState ) {
    filterByState = validateFilterByState(filterByState);

    let result = await getAddressesIncludeState(rowsLimitParam, filterByState);
    res.json(result.rows);
  } else {
    let result = await getAddresses(rowsLimitParam);
    res.json(result.rows);
  }
}));

module.exports = router;
