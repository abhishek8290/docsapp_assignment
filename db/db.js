const mysql = require('mysql');
require('dotenv').config();
// const con = mysql.createConnection({
//     host: "testdb.cvwvaxxojmyx.us-west-2.rds.amazonaws.com",
//     user: "root",
//     password: "docsapp123",
//     database: "node",
// });
const con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = con;