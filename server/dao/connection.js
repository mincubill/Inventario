var mysql = require( 'mysql' );

var con = mysql.createConnection({
  host: "192.168.2.201",
  user: "citt",
  password: "Citt.2018",
  database: "inventory",
  acquireTimeout: 1000000

});
module.exports = con;