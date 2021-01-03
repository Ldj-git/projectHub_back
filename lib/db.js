var mysql      = require('mysql');
var secret = require('./secrets/db_secrets');
var con = mysql.createConnection({
  host     : secret.host,
  user     : secret.user,
  password : secret.password,
  database : secret.database,
  port : secret.port
});
 
module.exports = con;