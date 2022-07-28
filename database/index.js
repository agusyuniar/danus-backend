const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'danus',
    port: '3306',
    // multipleStatements: true
    // timezone: 'UTC'
});

module.exports = {
    sqlDB: db
};