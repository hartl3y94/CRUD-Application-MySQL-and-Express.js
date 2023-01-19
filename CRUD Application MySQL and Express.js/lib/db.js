var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ipaddress'
});
connection.connect(function(error){
  if (!!error) {
    console.log(error);
  } else {
    console.log("Express app started on Port 5000!");
    console.log("Database connection Successful!");
  }
});

module.exports = connection;