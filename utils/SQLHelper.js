const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "0000",
    database: "sharebook",
})

module.exports = pool.promise();