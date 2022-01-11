// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: '192.168.0.31',
  user: 'app1_test',//app1
  password: 'app_pass_test1',//app_pass1
  database: 'app1_test'
});


// with placeholder
connection.query(
  'SELECT * FROM cases',
  [],
  function(err, results) {
    console.log(err)
    console.log(results);
  }
);