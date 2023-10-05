import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Users from "./users.js";

const DiabetesChecks=sequelize.define("DiabetesChecks",{
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    result: DataTypes.INTEGER
});

Users.hasMany(DiabetesChecks);
DiabetesChecks.belongsTo(Users);

export default DiabetesChecks;