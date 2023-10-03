import express from 'express';
import bodyParser from 'body-parser';
import doctorRouter from './route/doctor.js';
import patientsRouter from './route/patients.js';

const server = express();
const port = 2222;


/*const sequelize = new Sequelize('db_baru', 'username', 'password',{
    host: 'localhost',
    dialect: 'mysql'
});
   
sequelize.authenticate().then(() => {
    console.log("Connection to database succesful")
});*/

server.use(bodyParser.urlencoded({ extended: false}));
server.use(bodyParser.raw());
server.use(bodyParser.json());

server.use("/doctor", doctorRouter);
server.use("/patients", patientsRouter);

//Middleware
server.use((error, request, response, next) => {
    response.status(500);
    response.json({
        message: "Internal server error!",
    });
    
    console.log("Log error from middleware:");
    console.error(error);
    next();
});


server.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});

