const mysql = require('mysql2');
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root123456',
  database: process.env.DB_NAME || 'batloung_db',
  waitForConnections: true,
  connectionLimit: 10
});
module.exports = pool.promise();
