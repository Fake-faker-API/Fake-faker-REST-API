const { dbQuery } = require("./db-query");

async function getMovies() {
  const SQL = "SELECT * FROM movies";

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getMovies
}