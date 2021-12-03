var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { dbQuery } = require('../lib/db-query');
const catchError = require('../lib/catch-error');
const { getUsers } = require('../lib/users-query');


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
    let result = await getUsers();
    res.json(result.rows);
}));

module.exports = router;
