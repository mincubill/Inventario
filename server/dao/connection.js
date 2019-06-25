var mysql = require( 'mysql' );

var con = mysql.createConnection({
  host: "192.168.56.101",
  user: "Rigo",
  password: "Rigo1998",
  database: "inventory",
  acquireTimeout: 1000000

});
module.exports = con;