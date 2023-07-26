const { Pool } = require('pg');
const { config } = require('../../commons/config');

function createPool() {
  return new Pool({
    host: config.postgres.host,
    port: config.postgres.port,
    database: config.postgres.database,
    user: config.postgres.username,
    password: config.postgres.password,
  });
}

const pool = createPool();

module.exports = { pool };
