require("dotenv").config({ path: ".env" });

module.exports = {
  test: {
    username: process.env.DATABASE_USER,
    password: null,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    operatorsAliases: 0
  },
  development: {
    username: process.env.DATABASE_USER,
    password: null,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    operatorsAliases: 0
  },
  production: {
    username: process.env.DATABASE_USER,
    password: null,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    operatorsAliases: 0
  }
};
