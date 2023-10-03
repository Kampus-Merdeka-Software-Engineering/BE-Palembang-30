import { Router } from 'express';
import { get, post } from '../controllers/doctor.js';

const doctorRouter = Router();

doctorRouter.get("/:No", get);

doctorRouter.post("/", post);

export default  doctorRouter;
