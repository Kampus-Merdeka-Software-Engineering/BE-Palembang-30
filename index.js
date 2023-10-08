import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './Routes/users.js';
import { startSequelize } from './utils/startSequelize.js';
import sequelize from './config/sequelize.js';
import dotenv from 'dotenv';
import feedbacksRouter from './Routes/feedbacks.js';
import doctorsRouter from './Routes/doctors.js';
import diabetesChecksRouter from './Routes/diabetes_checks.js';
import cors from 'cors';
import sessionMiddleware from './config/session.js';

dotenv.config();

const server=express();
const port =process.env.PORT;

startSequelize(sequelize);
// sequelize.models.Users.create({
//     username: "perk",
//     email: "per123@mail.id",
//     password: "123",
// });

// sequelize.authenticate().then(()=>{
//     console.log("connection to database successfull")
// })

server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.raw());
server.use(bodyParser.json());
server.use(cors({credentials:true}));

server.use(sessionMiddleware);

server.use("/users",usersRouter);
server.use("/feedbacks",feedbacksRouter);
server.use("/diabetesChecks",diabetesChecksRouter);
server.use("/doctors",doctorsRouter);

server.use((error,req,res,next)=>{
    res.status(500).json({
        message:"internal server error"
    });
    console.error(error);
    next();
});

server.listen(port, ()=>{
    console.log(`Server is running at port ${port}.`)
});