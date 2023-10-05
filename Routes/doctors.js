import {Router} from 'express';
import {deleteDoctorById, getAllDoctors,getDoctorById, postDoctor, putDoctorById} from '../Controllers/doctors.js';

const doctorsRouter = Router();

doctorsRouter.get("/",getAllDoctors);
doctorsRouter.get("/:id",getDoctorById);

doctorsRouter.post("/",postDoctor);

doctorsRouter.put("/:id",putDoctorById);

doctorsRouter.delete("/:id",deleteDoctorById);

export default doctorsRouter;