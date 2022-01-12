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
(async () => {
  try {
    let id = 2
      await connection
          .execute(
              'DELETE FROM `cases` WHERE id=?', 
              [ id ])
      return true
  }
  catch (e) {
      console.log(e)
      return false
  }

})()