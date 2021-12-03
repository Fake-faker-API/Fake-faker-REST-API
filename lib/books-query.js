const { dbQuery } = require("./db-query");

async function getBooks() {
  const SQL = "SELECT * FROM books";

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getBooks
}