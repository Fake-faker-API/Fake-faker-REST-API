const { dbQuery } = require("./db-query");

async function getBooks(rowNum) {
  const SQL = `SELECT * FROM books LIMIT ${rowNum}`;

  let result = await dbQuery(SQL);
  return result;
};

async function getBooksFilterByGenre(rowNum, genreArr) {
  const whereClause = 'WHERE ' + genreArr.map(genreName => `books.genre LIKE '${genreName}%'`).join(' OR ');

  const SQL = `SELECT * FROM books ${whereClause} LIMIT ${rowNum}`;
  console.log(SQL);
  
  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getBooks,
  getBooksFilterByGenre
}