const { dbQuery } = require('./db-query');

async function getUsers(rowNum) {
  const SQL = `SELECT * FROM users LIMIT ${rowNum}`;

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getUsers
}