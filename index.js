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
const whitelist = ['http://127.0.0.1:5501', 'https://be-palembang-30.vercel.app'];

// ✅ Enable pre-flight requests
server.options('*', cors());

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

server.use(cors(corsOptions));

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