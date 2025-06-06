// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"
// import validator from "validator"

// // login user

// const loginUser = async(req,res) => {
//     const {email,password} = req.body; 
//     try {
//         const user = await userModel.findOne({email})

//         if (!user){
//             return res.json({success:false,message:"User doesn't exist"})
//         }
//         const isMatch = await bcrypt.compare(password,user.password);
//         if(!isMatch){
//             return res.json({success:false,message:"Invalid Password"})
//         }

//         const token = createToken(user._id);
//         res.json({success:true,token})
//         // console.log(token);
        

//     } catch (error) {
//         console.log(error);
//          res.json({success:false,message:"Error"})

        
//     }
// }

// const createToken = (id) =>{
//     return jwt.sign({id},process.env.JWT_SECRET)
// }

// // register user
// const registerUser = async(req,res) => {
//     const {name , email,password} = req.body;
//     try {

//         const exists = await userModel.findOne({email});
//         if(exists){
//             return res.json({success:false,message:"User already exists with this email"})
//         }

//         // validate email and strong password

//         if(!validator.isEmail(email)){
//             return res.json({success:false,message:"Invalid email"})
//         }
//         if (password.length<8) {
//             return res.json ({success:false,message:"Please enter a strong password"})
//         }

//         // encryt the password

//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt);

//         // new user 

//         const newUser = new userModel({
//             name:name,
//             email:email,
//             password:hashedPassword
//         })

//         const user = await newUser.save()

//         const token = createToken(user._id)
//         res.json({success:true,token})


//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
        
//     }
// }

// export {loginUser, registerUser}

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User doesn't exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid Password" });

        const token = createToken(user._id, user.role);
        res.json({ success: true, token, credits: user.credits });
    } catch (error) {
        res.json({ success: false, message: "Error logging in" });
    }
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) return res.json({ success: false, message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        const token = createToken(newUser._id, newUser.role);
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: "Error registering user" });
    }
};