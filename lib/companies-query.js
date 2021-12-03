const { dbQuery } = require("./db-query");

async function getCompanies() {
  const SQL = "SELECT * FROM companies";

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getCompanies
}