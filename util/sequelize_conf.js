const Sequelize = require("sequelize");

const database = process.env.LIVE_DB_NAME;

const sequelize = new Sequelize(
  database,
  process.env.LIVE_DB_USER,
  process.env.LIVE_DB_PASS,
  {
    dialect: "mysql",
    host: process.env.LIVE_DB_HOST,
  }
);

module.exports = sequelize;
