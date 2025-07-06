//db.js

const dotenv= require('dotenv')

const {Pool}  = require('pg');
dotenv.config()

const userRegisterconnection = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});


module.exports = userRegisterconnection;



