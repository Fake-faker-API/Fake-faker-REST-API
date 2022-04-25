const { dbQuery } = require("./db-query");

async function getAddresses(rowNum) {
  const SQL = `SELECT * FROM addresses LIMIT ${rowNum}`;

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getAddresses
}