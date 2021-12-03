var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const catchError = require("../lib/catch-error");
const { getCompanies } = require('../lib/companies-query');

router.get('/', catchError(async (req, res, next) => {
    let result = await getCompanies();
    res.json(result.rows);
}));

module.exports = router;
