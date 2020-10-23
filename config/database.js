const { createPool } = require("mysql");
const mongoose = require("mongoose");

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

// var mongoURI = '"mongodb+srv://admin:admin@cluster0.reyso.mongodb.net/test"'
// const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });
module.exports = { pool };

