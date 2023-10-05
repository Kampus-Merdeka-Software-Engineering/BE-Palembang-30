import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Doctors=sequelize.define("Doctors",{
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    phone_number: DataTypes.STRING
});

export default Doctors;