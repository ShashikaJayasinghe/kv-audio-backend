import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import nodemailer from "nodemailer";

dotenv.config();
const transport = nodemailer.createTransport({      // transport is used to send email
        service : "gmail",
        host : "smtp.gmail.com",
        port : 587,
        secure : false,
        auth : {
            user : "shashikajay72@gmail.com",
            pass : "pvjdmfiynpveknxz",
        }
    })

export async function registerUser (req, res) {
    const data = req.body;
    data.password = bcrypt.hashSync(data.password,10);
    const newUser = new User(data); 

    try {
        await newUser.save();
        res.json({message: "User registered successfully"})
    }catch (error) {
        res.status(500).json({error: "User registration failed"})
    }
}

export async function loginUser(req, res) {
    
    try {
        const data = req.body;
        const user = await User.findOne({ email : data.email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.isBlocked) {
            return res.status(403).json({ error: "Your account is blocked please contact the admin" });

        }
        const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Login failed" });
        }
        const token = jwt.sign(
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture,
                phone: user.phone,
                emailVerified: user.emailVerified
            },
            process.env.JWT_SECRET
            
        );
        res.json({ message: "Login successful", token : token, user : user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export function isItAdmin (req) {
    let isAdmin = false;
    if (req.user != null && req.user.role == "admin") {     //if user is admin we can see all products
        isAdmin = true;
    }   
    return isAdmin; 
}

export function isItCustomer (req) {
    let isCustomer = false;
    if (req.user != null && req.user.role == "customer") {
        isCustomer = true;
    }
    return isCustomer;
}

export async function getAllUsers (req, res) {
    if (isItAdmin(req)) {
        try {
            const users = await User.find();
            res.json(users);
        }catch (error) {
            res.status(500).json({error : "failed to get users"});
        }
    }else {
        res.status(403).json({error : "You are not authorized to perform this action"});
    }
}

export async function blockOrUnblockUser (req, res) {
    const email = req.params.email;
    if (isItAdmin(req)) {
        try {
            const user = await User.findOne({email : email});
            if (user == null) {
                res.status(404).json({error : "User not found"});
                return;
            }

            const isBlocked =! user.isBlocked;

            await User.updateOne(
                {
                    email : email
                },
                {
                    isBlocked : isBlocked
                }
            );

            res.json({message : "User blocked or unblocked successfully"});

        }catch (error) {
            res.status(500).json({error : "failed to block or unblock user"});
        }
    }else {
        res.status(403).json({error : "You are not authorized to perform this action"});
    }
}

export function getUser (req, res) {
    if (req.user != null) {
        res.json(req.user);     // users information send as response in json format
    }else {
        res.status(403).json({error : "You are not authorized to perform this action"});
    }
}

export async function logingWithGoogle (req, res) {
    //https://www.googleapis.com/oauth2/v3/userinfo
    const accessToken = req.body.accessToken;       //get access token from frontend
    console.log(accessToken);
    try {
    const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers : {
            Authorization : `Bearer ${accessToken}`
        },
    });
    console.log(response.data);
    const user = await User.findOne({email : response.data.email});     // find user by email
    if (user != null) {
        const token = jwt.sign(
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture,
                phone: user.phone,
                emailVerified: true
            },
            process.env.JWT_SECRET
            
        );
        res.json({ message: "Login successful", token : token, user : user });
    }
    else {
        const newUser = new User({
            email : response.data.email,
            password : "123",
            firstName : response.data.given_name,
            lastName : response.data.family_name,
            address : "Not Given",
            phone : "Not Given",
            profilePicture : response.data.picture,
            emailVerified : true,
        });
        const savedUser = await newUser.save();     // save user in database
        const token = jwt.sign(
            {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                role: savedUser.role,
                profilePicture: savedUser.profilePicture,
                phone: savedUser.phone,
            },
            process.env.JWT_SECRET
            
        );
        res.json({ message: "Login successful", token : token, user : savedUser });
    }
    }catch (error) {
        console.log(error);
        res.status(500).json({error : "failed to login with google"});
    }
}

export async function sendOTP (req, res) {
    if (req.user == null) {
        res.status(403).json({error : "You are not authorized to perform this action"});
        return;
    }
    const message = {
        from : "shashikajay72@gmail.com",
        to : req.user.email,                    // send requested user email
        subject : "Validating OTP",
        text : "Your OTP code is",
    }

    transport.sendMail(message, (err, info)=>{
        if (err) {
            console.log(err);
            res.status(500).json({error : "failed to send OTP"});
        }else {
            console.log(info);
            res.json({message : "OTP sent successfully"});
        }
    });
    
}
















// export function loginUser (req, res) {
//     const data = req.body;
//     User.findOne({
//         email : data.email
//     }).then ((user)=>{
//         if (user == null) {
//             res.status(404).json({error: "user not found"});
//         }else {
//             const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);
//             if (isPasswordCorrect) {
//                 const token = jwt.sign({
//                     firstName : user.firstName,
//                     lastName : user.lastName,
//                     email : user.email,
//                     role : user.role,
//                     profilePicture : user.profilePicture
//                 },process.env.JWT_SECRET);               
//                 res.json({message: "Login successful", token : token});
//             }else {
//                 res.status(401).json({error : "login failed"});
//             }
//         }
//     })
// }

