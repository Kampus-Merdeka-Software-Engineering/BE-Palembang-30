import { Router } from 'express';
import { get, post } from '../controllers/patients.js';

const patientsRouter = Router();

patientsRouter.get("/:No", get);

patientsRouter.post("/", post);


export default  patientsRouter;
