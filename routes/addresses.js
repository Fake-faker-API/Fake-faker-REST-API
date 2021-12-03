var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const catchError = require("../lib/catch-error");
const { getAddresses } = require('../lib/addresses-query');

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
          "street_number": "1000",
          "street_name": "Washington ave",
          "city": "Chicago",
          "state": "IL",
          "zipcode": "60640",
          "country": "US"
      },
      {
          "id": 2,
          "street_number": "1000",
          "street_name": "Washington ave",
          "city": "Chicago",
          "state": "IL",
          "zipcode": "60640",
          "country": "US"
      }
    ]
 */

router.get('/', catchError(async (req, res, next) => {
    let result = await getAddresses();
    res.json(result.rows);
}));

module.exports = router;
