import { Sequelize } from "sequelize";
import "../models/index.js";

/**
 * 
 * @param {Sequelize} sequelize 
 */
export const startSequelize=async(sequelize)=>{
    try{
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
        console.log("connection to database successfull");
        console.log(`models available in sequelize: ${Object.keys(sequelize.models).join(", ")}`);
    } catch(e){
        console.error("connection to database failed",e);
    }

};