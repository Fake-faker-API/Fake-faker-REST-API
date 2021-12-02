var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { dbQuery } = require("../lib/db-query");
const catchError = require("../lib/catch-error");


router.get('/', catchError(async (req, res, next) => {
    let result = await getAddresses();
    res.json(result.rows);
}));

  // TODO extract these later
async function getAddresses() {
  const SQL = "SELECT * FROM addresses";

  let result = await dbQuery(SQL);
  return result;
};

module.exports = router;
