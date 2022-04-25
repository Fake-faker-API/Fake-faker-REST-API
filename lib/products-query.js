const { dbQuery } = require("./db-query");

async function getProducts(rowNum) {
  const SQL = `SELECT * FROM products LIMIT ${rowNum}`;

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getProducts
}