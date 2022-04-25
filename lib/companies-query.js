const { dbQuery } = require("./db-query");

async function getCompanies(rowNum) {
  const SQL = `SELECT * FROM companies LIMIT ${rowNum}`;

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getCompanies
}