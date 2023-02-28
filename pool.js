const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.ELEPHANT_SQL_CONNECTION_STRING,
});
module.exports = pool;