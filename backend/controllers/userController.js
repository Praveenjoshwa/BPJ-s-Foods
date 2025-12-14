import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt"
import validator from "validator"


// login user
const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }

        const isMatch =await bycrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({success:false, message:"invalid credentials"})
        }
        const token =createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }




}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register function
const registerUser = async (req,res)=>{
    const {name,password,email}=req.body;

    //to chech user already exist
    try {
        const exist = await userModel.findOne({email});
        if (exist){
           return res.json({success:false,message:"user already exist"})
        }

        //validate email formate and strong password
        if(!validator.isEmail(email)){
           return res.json({success:false,message:"please enter valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"please enter strong password"})
        }
        //hashing user password
        const salt =await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password,salt);

        //add new user
        const newUser =new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token =createToken(user._id)
        res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

export {loginUser,registerUser}