import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
            },
            process.env.JWT_SECRET
            
        );
        res.json({ message: "Login successful", token : token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
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

