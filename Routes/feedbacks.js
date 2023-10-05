import { Router } from "express";
import { deleteFeedbacksById, getAllFeedbacks, getFeedbacksById, postFeedbacks, putFeedbacksById } from "../Controllers/feedbacks.js";

const feedbacksRouter = Router();

feedbacksRouter.get("/:id",getFeedbacksById);
feedbacksRouter.get("/",getAllFeedbacks);

feedbacksRouter.post("/",postFeedbacks);

feedbacksRouter.put("/:id",putFeedbacksById);

feedbacksRouter.delete("/:id",deleteFeedbacksById)

export default feedbacksRouter;