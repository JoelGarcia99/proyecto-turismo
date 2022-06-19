require('dotenv').config()
const mysql = require('mysql2');

console.log("Connecting to mysql using the next credentials");
console.log("HOST", process.env.DB_HOST);
console.log("USER", process.env.DB_USER);
console.log("DATABASE", process.env.DB_DATABASE);
console.log("PASSWORD", process.env.DB_PASSWORD);

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD
});

const db_connection = (req, _, next) => {
	req.conn = connection;
	next();
}

module.exports = db_connection;
