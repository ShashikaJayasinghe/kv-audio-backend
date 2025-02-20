import express from "express";
import { addReview, approveReviews, deleteReview, getReviews } from "../controllers/reviewController.js";

const reviewRouter = express.Router();
reviewRouter.post("/",addReview);
reviewRouter.get("/",getReviews);

reviewRouter.delete("/:email",deleteReview);
reviewRouter.put("/approve/:email", approveReviews);

export default reviewRouter;