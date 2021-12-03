var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const catchError = require("../lib/catch-error");
const { getAddresses } = require('../lib/addresses-query');

router.get('/', catchError(async (req, res, next) => {
    let result = await getAddresses();
    res.json(result.rows);
}));

module.exports = router;
