var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-02.cleardb.net',
  port     : '3306',
  user     : 'b97a2c74b6f3b4',
  password : '42e91a94',
  database : 'heroku_366f6c23b35b624',
  multipleStatements: true
});
module.exports = connection;

