const asynchandler = require("express-async-handler")
const User = require("../models/user.js")
const Token = require("../utils/generateToken.js")
const bcrypt = require("bcryptjs")

const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;

    const userExists = await User.findOne({email});
    console.log("register details:-",req.body);
    if(userExists){
        console.log("user exists")
        return res.status(500).json({message:"user exists"});
    }

    const user = new User({name,email,password});
    await user.save();
    if(user){
        res.status(201).json({
            id: user._id,
            name:user.name,
            email:user.email,
            token: Token(user._id),
        });
    }else{
        console.log("Invalid User Data")
        return res.status(500).json({message:"Invalid User Data"});
    }

}


const authUser =async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    console.log("login details:-",req.body);
    console.log(user);
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            id:user._id,
            name:user.name,
            email:user.email,
            token:Token(user._id),
        });
    }
    else{
        console.log("Invalid User Data")
        return res.status(500).json({message:"Invalid User Data"});
    }
}


const getUserProfile = asynchandler(async(req,res)=>{
    const user = User.findById(req.user.id);

    if(user){
        res.json({
            id:user.id,
            name:user.name,
            email:user.email,
        });
    }
    else{
        console.log("Invalid User Data")
        return res.status(500).json({message:"Invalid User Data"});
    }
})

module.exports = {
    registerUser,authUser,getUserProfile
};