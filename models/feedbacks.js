import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import Users from "./users.js";

const Feedbacks=sequelize.define("Feedbacks",{
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    subject: DataTypes.STRING,
    feedback: DataTypes.TEXT('long'),
});

Users.hasMany(Feedbacks);
Feedbacks.belongsTo(Users);

export default Feedbacks;