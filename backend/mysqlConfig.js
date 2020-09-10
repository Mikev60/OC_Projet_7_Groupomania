require('dotenv').config();
var mysql = require('mysql');

// Connexion à MYSQL
var bdd = mysql.createConnection({
  socketPath : process.env.SOCKET_PATH,
  user : process.env.USERDB,
  password : process.env.PASSWORD,
  host : process.env.HOST,
  database : process.env.DATABASE
});

module.exports = bdd;