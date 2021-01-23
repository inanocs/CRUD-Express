const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "192.168.1.3",
  user: "biblioteca",
  password: "biblioteca",
  database: "biblioteca",
  port: 3306,
});

module.exports = conn;
