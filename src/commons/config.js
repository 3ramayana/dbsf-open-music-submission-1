const dotenv = require('dotenv');

dotenv.config();

const config = {
  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
  postgres: {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
  },
};

module.exports = { config };
