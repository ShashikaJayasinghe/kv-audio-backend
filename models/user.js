import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isBlocked : {
        type : Boolean,
        required : true,
        default : false
    },
    role : {
        type : String,
        required : true,
        default : "customer"
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    profilePicture : {
        type : String,
        required : true,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6zbqP47FBX9FbPUsz8-8fdEFKSisLnoLGKzxsDKwDhl_J-QYnMFRDf3Ghas2qvgWYUs&usqp=CAU"
    },
    emailVerified : {
        type : Boolean,
        required : true,
        default : false
    }
});

const User = mongoose.model("User", userSchema);

export default User;