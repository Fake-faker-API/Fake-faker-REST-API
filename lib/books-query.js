const { dbQuery } = require("./db-query");

async function getBooks(rowNum) {
  const SQL = `SELECT * FROM books LIMIT ${rowNum}`;
  
  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getBooks
}