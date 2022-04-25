const { dbQuery } = require("./db-query");

async function getMovies(rowNum) {
  const SQL = `SELECT * FROM movies LIMIT ${rowNum}`;

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getMovies
}