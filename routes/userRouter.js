import express from "express";
import { blockOrUnblockUser, getAllUsers, getUser, logingWithGoogle, loginUser, registerUser, sendOTP } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/all",getAllUsers);
userRouter.put("/block/:email",blockOrUnblockUser);
userRouter.post("/google",logingWithGoogle);
userRouter.get("/sendOTP",sendOTP)
userRouter.get("/",getUser);


export default userRouter;