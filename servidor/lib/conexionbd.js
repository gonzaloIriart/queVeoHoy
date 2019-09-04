var mysql = require('mysql');

var connection = mysql.createConnection('mysql://b97a2c74b6f3b4:42e91a94@us-cdbr-iron-east-02.cleardb.net/heroku_366f6c23b35b624?reconnect=true');
module.exports = connection;

