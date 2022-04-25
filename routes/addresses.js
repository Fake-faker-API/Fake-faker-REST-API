var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const catchError = require("../lib/catch-error");
const { getAddresses } = require('../lib/addresses-query');
const { validateStringParamIsInt } = require('../utils/general-utils');
const { MIN_ROWS, MAX_ROWS } = require('../utils/constants/query-results-rows-limit-const');

/**
 * @api {get} /addresses Retrieves all addresses
 * @apiGroup Addresses
 * 
 * @apiSuccess {Object[]} address                    List of addresses.
 * @apiSuccess {Number}   address.id                 Id of the address.
 * @apiSuccess {String}   address.street_number      Street number.
 * @apiSuccess {String}   address.street_name        Street name.
 * @apiSuccess {String}   address.city               City.
 * @apiSuccess {String}   address.state              State.
 * @apiSuccess {String}   address.country            Country.
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * 
    [
      {
        "id": 1,
        "street_number": "3169",
        "street_name": "Buckingham Drive",
        "city": "Beach",
        "state": "VA",
        "zipcode": "44612",
        "country": "US"
      },
      {
        "id": 2,
        "street_number": "9853",
        "street_name": "2nd Avenue",
        "city": "Pryor",
        "state": "LA",
        "zipcode": "74459",
        "country": "US"
      }
    ]
 */
/**
 * @apiSampleRequest /addresses
 */

router.get('/', catchError(async (req, res, next) => {
  let totalRows = req.query.total_rows
  let rowsLimitParam = 10;
  if (totalRows && validateStringParamIsInt({ value: totalRows, minInt: MIN_ROWS, maxInt: MAX_ROWS })) {
    rowsLimitParam = parseInt(totalRows, 10);
  }
    let result = await getAddresses(rowsLimitParam);
    res.json(result.rows);
}));

module.exports = router;
