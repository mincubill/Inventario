var mysql = require( 'mysql' );

var con = mysql.createConnection({
  host: "192.168.1.134",
  user: "weasdf",
  password: "palito",
  database: "inventory",
  acquireTimeout: 1000000

});
module.exports = con;