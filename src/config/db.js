import mysql from 'mysq12/promise';
import 'dotenv/config';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASENAME,
}).promise();

export default pool ;