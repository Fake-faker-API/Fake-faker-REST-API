const { Client } = require("pg");
const config = require("./config");

const isProduction = (config.NODE_ENV === "production");
let CONNECTION = { };

if (isProduction) {
  CONNECTION = {
    connectionString: config.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  }
} else {
  CONNECTION = {
    database: config.DB_NAME_LOCAL
  }
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