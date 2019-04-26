const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'chaining-me_db_1',
  user: 'root',
  database: 'chaining_db',
  password: 'qwe789'
});

module.exports = pool.promise();