var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { dbQuery } = require("../lib/db-query");
const catchError = require("../lib/catch-error");
const { getProducts } = require('../lib/products-query');
const { MIN_ROWS, MAX_ROWS } = require('../utils/constants/query-results-rows-limit-const');

/**
 * @api {get} /products Retrieves all products
 * @apiGroup products
 * 
 * @apiSuccess {Object[]} product                        List of products.
 * @apiSuccess {Number}   product.id                     Id of the product.
 * @apiSuccess {String}   product.title                  Title of the product.
 * @apiSuccess {String}   product.description            Description of the product.
 * @apiSuccess {String}   product.price                  Price of the product.
 * @apiSuccess {String}   product.category               Category of the product.
 * @apiSuccess {String}   product.sku                    Product SKU.
 * @apiSuccess {String}   product.stock_quantity         Product quantity in stock.
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * 
  [
    {
      "id": 1,
      "title": "Table",
      "description": "A very nice glass table with four legs",
      "price": "10.99",
      "category": "household",
      "sku": "TA-TBLE-IOPO",
      "stock_quantity": 100
    },
    {
      "id": 2,
      "title": "Table",
      "description": "A very nice glass table with four legs",
      "price": "10.99",
      "category": "household",
      "sku": "TA-TBLE-IOPO",
      "stock_quantity": 100
    }
  ]
 */

router.get('/', catchError(async (req, res, next) => {
  let totalRows = req.query.totalRows
  let rowsLimitParam = 10;
  if (totalRows && validateStringParamIsInt({ value: totalRows, minInt: MIN_ROWS, maxInt: MAX_ROWS })) {
    rowsLimitParam = parseInt(totalRows, 10);
  }
    let result = await getProducts(rowsLimitParam);
    res.json(result.rows);
}));

module.exports = router;
