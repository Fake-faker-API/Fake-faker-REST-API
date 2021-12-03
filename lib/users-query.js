const { dbQuery } = require('./db-query');

async function getUsers() {
  const SQL = "SELECT * FROM users";

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getUsers
}