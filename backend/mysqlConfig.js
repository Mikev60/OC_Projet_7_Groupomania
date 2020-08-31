var mysql = require('mysql');

// Connexion à MYSQL
var bdd = mysql.createConnection({
  socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
  user : 'root',
  password : 'root',
  host : '127.0.0.1',
  database : 'Groupomania'
});

module.exports = bdd; 