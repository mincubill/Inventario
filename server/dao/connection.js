var mysql = require( 'mysql' );

var con = mysql.createConnection({
  host: "192.168.96.3",
  user: "higlord",
  password: "Alchimis01.",
  database: "veranum",
  acquireTimeout: 1000000

});
module.exports = con;