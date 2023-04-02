require("dotenv").config();
const { Client } = require("pg");

const config = {
  dev: {
    database: "movielib",
    user: "postgres",
    password: process.env.DB_PASSWORD,
  },
  prod: {
    connectionString: process.env.DB_URL,
  },
};

module.exports = new Client(process.env.DB_URL ? config.prod : config.dev);
