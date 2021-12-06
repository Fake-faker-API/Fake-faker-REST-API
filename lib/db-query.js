const { Client } = require("pg");
const config = require("./config");

const isProduction = (config.NODE_ENV === "production");
const CONNECTION = {
  connectionString: config.DATABASE_URL,
  ssl: isProduction,  // See note below
  // ssl: { rejectUnauthorized: false },
};

module.exports = {
  async dbQuery(statement) {
    let client = new Client(CONNECTION);

    await client.connect();
    let result = await client.query(statement);
    await client.end();

    return result;
  }
};