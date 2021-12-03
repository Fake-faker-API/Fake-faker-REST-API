const { dbQuery } = require("./db-query");

async function getAddresses() {
  const SQL = "SELECT * FROM addresses";

  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getAddresses
}