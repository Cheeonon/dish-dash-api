require('dotenv').config();

module.exports = {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      charset: "utf8"
    }
  };