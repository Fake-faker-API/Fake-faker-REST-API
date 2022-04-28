const { dbQuery } = require("./db-query");

async function getAddresses(rowNum) {
  const SQL = `SELECT * FROM addresses LIMIT ${rowNum}`;

  let result = await dbQuery(SQL);
  return result;
};

// 1 or more states
async function getAddressesFilterByState(rowNum, statesArr) {

  const whereClause = 'WHERE ' + statesArr.map(stateName => `addresses.state='${stateName}'`).join(' OR ');
  
  const SQL = `SELECT * FROM addresses ${whereClause} LIMIT ${rowNum}`;
  console.log(SQL)
  let result = await dbQuery(SQL);
  return result;
};

module.exports = {
  getAddresses,
  getAddressesFilterByState
}