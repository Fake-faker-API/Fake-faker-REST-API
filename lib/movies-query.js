const { dbQuery } = require("./db-query");

async function getMoviesIncludeGenre(rowNum, genreArr) {
  const whereClause = 'WHERE ' + genreArr.map(genreName => `movies.genre LIKE '${genreName}%'`).join(' OR ');

  const SQL = `SELECT * FROM movies ${whereClause} LIMIT ${rowNum}`;
  console.log(SQL);
  
  let result = await dbQuery(SQL);
  return result;
};

async function getMovies(rowNum) {
  const SQL = `SELECT * FROM movies LIMIT ${rowNum}`;

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getMovies,
  getMoviesIncludeGenre
}