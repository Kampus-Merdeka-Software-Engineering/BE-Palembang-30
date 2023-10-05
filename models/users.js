import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Users=sequelize.define("Users",{
    username:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
});

export default Users;