var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { dbQuery } = require('../lib/db-query');
const catchError = require('../lib/catch-error');
const { getUsers } = require('../lib/users-query');
const { validateStringParamIsInt } = require('../utils/general-utils');
const { MIN_ROWS, MAX_ROWS } = require('../utils/constants/query-results-rows-limit-const');


/**
 * @api {get} /users Retrieves all users
 * @apiGroup Users
 * 
 * @apiSuccess {Object[]} users                    List of users.
 * @apiSuccess {Number}   users.id                 Id of the user.
 * @apiSuccess {String}   users.first_name         User's first name.
 * @apiSuccess {String}   users.last_name          User's last name.
 * @apiSuccess {String}   users.username           User's username.
 * @apiSuccess {String}   users.password           User's password.
 * @apiSuccess {String}   users.email              User's email.
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
      {
          "id": 1,
          "first_name": "Bob",
          "last_name": "Lee",
          "username": "bob123",
          "password": "y29ehae34&",
          "email": "bob32@email.com"
      },
      {
          "id": 2,
          "first_name": "Bob",
          "last_name": "Lee",
          "username": "bob123",
          "password": "y29ehae34&",
          "email": "bob32@email.com"
      }
    ]
 */

router.get('/', catchError(async (req, res, next) => {
  let totalRows = req.query.total_rows
  let rowsLimitParam = 10;
  if (totalRows && validateStringParamIsInt({ value: totalRows, minInt: MIN_ROWS, maxInt: MAX_ROWS })) {
    rowsLimitParam = parseInt(totalRows, 10);
  }
    let result = await getUsers(rowsLimitParam);
    res.json(result.rows);
}));

module.exports = router;
