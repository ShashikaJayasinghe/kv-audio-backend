import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";
import cors from "cors";
import orderRouter from "./routes/orderRouter.js";
import contactRouter from "./routes/contactRouter.js";

dotenv.config();

const app = express();
app.use(cors());          

app.use(bodyParser.json());     //middleware
app.use((req,res,next)=>{
    let token = req.header("Authorization")
    
    if (token != null) {
        token = token.replace("Bearer ","");
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
            if (!err) {
                req.user = decoded;
            }
        });
    }
    next();
})     

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);
const connection = mongoose.connection        
connection.once("open", ()=> {      
    console.log("MongoDB connection established successfully")
})



app.use("/api/users",userRouter)        //plug  or   end points userrouter => controller => models
app.use("/api/products", productRouter)
app.use("/api/reviews",reviewRouter)
app.use("/api/inquiries",inquiryRouter)
app.use("/api/orders",orderRouter)
app.use("/api/contact",contactRouter)

app.listen (3000,()=> {
    console.log("Server is running on port 3000")
})



//customer =>  john1.doe@example.com        123
//admin =>  john4.doe@example.com           123

//shashika3@gmail.com  123
//shashika4@gmail.com  123

//shashika1@gmail.com 123
//shashika4@gmail.com  123

//https://kv-audio-frontend-vert.vercel.app/admin