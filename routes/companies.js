var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { dbQuery } = require("../lib/db-query");
const catchError = require("../lib/catch-error");


router.get('/', catchError(async (req, res, next) => {
    let result = await getProducts();
    res.json(result.rows);
}));

  // TODO extract these later
async function getProducts() {
  const SQL = "SELECT * FROM companies";

  let result = await dbQuery(SQL);
  return result;
};

module.exports = router;
