const mysql = require('mysql2')


const config = /**production */ false ? 
    {
        host: 'localhost',
        user: 'app1',//app1
        password: 'app_pass1',//app_pass1
        database: 'app1'
    } :
    {
        host: '192.168.0.31',
        user: 'app1_test',//app1
        password: 'app_pass_test1',//app_pass1
        database: 'app1_test'
    }


module.exports = mysql.createConnection(config)