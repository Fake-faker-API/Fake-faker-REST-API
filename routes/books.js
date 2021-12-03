var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const catchError = require("../lib/catch-error");
const { getBooks } = require("../lib/books-query")

router.get('/', catchError(async (req, res, next) => {
 console.log(typeof getBooks)
    let result = await getBooks();
    res.json(result.rows);
}));


module.exports = router;
