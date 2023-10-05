import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';

dotenv.config();

const sequelize=new Sequelize(
    // process.env.MYSQL_URL
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        dialect: 'mysql',
        dialectModule: mysql2,
        host:process.env.MYSQLHOST,
        port: process.env.MYSQLPORT
        // dialect:process.env.DB_DIALECT
    }
);

export default sequelize;