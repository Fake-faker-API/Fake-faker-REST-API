const { Client } = require("pg");

module.exports = {
  async dbQuery(statement) {
    let client = new Client({ database: "fake-faker" });

    await client.connect();
    let result = await client.query(statement);
    await client.end();

    return result;
  }
};