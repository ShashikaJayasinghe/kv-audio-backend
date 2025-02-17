import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";

const app = express();          

app.use(bodyParser.json());     //middleware
app.use((req,res,next)=>{
    let token = req.header("Authorization")
    
    if (token != null) {
        token = token.replace("Bearer ","");
        jwt.verify(token,"kv-secret-89",(err,decoded)=>{
            if (!err) {
                req.user = decoded;
            }
        });
    }
    next();
})     

const mongoUrl = "mongodb+srv://admin:123@cluster0.shgk9.mongodb.net/prods?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUrl);
const connection = mongoose.connection        
connection.once("open", ()=> {      
    console.log("MongoDB connection established successfully")
})



app.use("/api/users",userRouter)        //plug  or   end points userrouter => controller => models
app.use("/api/products", productRouter)

app.listen (3000,()=> {
    console.log("Server is running on port 3000")
})