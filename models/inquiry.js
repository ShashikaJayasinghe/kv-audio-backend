import { response } from "express";
import mongoose, { Schema } from "mongoose";

const inquirySchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true 
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    response : {
        type : String,
        required : false,
        default : ""
    },
    isResolved : {
        type : Boolean,
        required : true,
        default : false
    }
});

const Inquiry = mongoose.model("inquiries", inquirySchema);

export default Inquiry;