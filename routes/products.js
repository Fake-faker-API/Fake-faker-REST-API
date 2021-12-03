var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { dbQuery } = require("../lib/db-query");
const catchError = require("../lib/catch-error");
const { getProducts } = require('../lib/products-query');

router.get('/', catchError(async (req, res, next) => {
    let result = await getProducts();
    res.json(result.rows);
}));

module.exports = router;
