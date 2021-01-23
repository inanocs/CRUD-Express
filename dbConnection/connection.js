const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "biblioteca",
  password: "biblioteca",
  database: "biblioteca",
  port: 3306,
});

module.exports = conn;
