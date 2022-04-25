var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const catchError = require("../lib/catch-error");
const { getBooks, getBooksIncludeGenre } = require("../lib/books-query");
const { validateStringParamIsInt } = require('../utils/general-utils');
const { validateFilterByGenre } = require('./helper-functions/validate-filter-by-genre-param');
const { MIN_ROWS, MAX_ROWS } = require('../utils/constants/query-results-rows-limit-const');

/**
 * @api {get} /books Retrieves all books
 * @apiGroup books
 * 
 * @apiSuccess {Object[]} book                    List of books.
 * @apiSuccess {Number}   book.id                 Id of the book.
 * @apiSuccess {String}   book.title              Title of the book.
 * @apiSuccess {String}   book.author             Author of the book.
 * @apiSuccess {String}   book.genre              Book genre(s)
 * @apiSuccess {String}   book.description        Book description.
 * @apiSuccess {String}   book.isbn               Book isbn.
 * @apiSuccess {Date}     book.date_published     Book publishing date.
 * @apiSuccess {String}   book.publisher          Book publisher company.
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * 
    [
      {
          "id": 1,
          "title": "How to sell a house",
          "author": "Jackie Chan",
          "genre": "Real Estate, Business",
          "description": "Learn how to sell a house",
          "isbn": "12345678910",
          "date_published": "2021-07-02T05:00:00.000Z",
          "publisher": "Book pub Inc"
      },
      {
          "id": 2,
          "title": "How to sell a house",
          "author": "Jackie Chan",
          "genre": "Real Estate, Business",
          "description": "Learn how to sell a house",
          "isbn": "12345678910",
          "date_published": "2021-07-02T05:00:00.000Z",
          "publisher": "Book pub Inc"
      }
   ]
 */

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
