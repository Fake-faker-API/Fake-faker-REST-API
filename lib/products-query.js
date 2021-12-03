const { dbQuery } = require("./db-query");

async function getProducts() {
  const SQL = "SELECT * FROM products";

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getProducts
}