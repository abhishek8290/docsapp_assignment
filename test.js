var mysql = require('mysql');

var con = mysql.createConnection({
  host: "testdb.cvwvaxxojmyx.us-west-2.rds.amazonaws.com",
  user: "root",
  password: "docsapp123",
  database: "node"
});

con.connect(function(err) {
  if (err) throw err;
  // const sql= "DESCRIBE Admin_abhisheks"
  const sql_query = "SELECT * FROM Admin_abhisheks"; 
  con.query(sql_query, function (err, result, fields) {
    console.log(result);
  });
});