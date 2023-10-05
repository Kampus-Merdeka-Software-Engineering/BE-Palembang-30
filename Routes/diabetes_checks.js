import { Router } from "express";
import { deleteDiabetesChecksById, getAllDiabetesChecks, getDiabetesChecksById, postDiabetesChecks, putDiabetesChecksById } from "../Controllers/diabetes_checks.js";

const diabetesChecksRouter = Router();

diabetesChecksRouter.get("/",getAllDiabetesChecks);
diabetesChecksRouter.get("/:id",getDiabetesChecksById);

diabetesChecksRouter.post("/",postDiabetesChecks);

diabetesChecksRouter.put("/:id",putDiabetesChecksById);

diabetesChecksRouter.delete("/:id",deleteDiabetesChecksById);

export default diabetesChecksRouter;