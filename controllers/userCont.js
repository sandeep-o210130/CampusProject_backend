const asynchandler = require("express-async-handler")
const User = require("../models/user.js")
const Token = require("../utils/generateToken.js")

const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;

    const userExists = await User.findOne({email});
    
    if(userExists){
        res.status(500);
        throw new Error('user already exists');
    }

    const user = await new User({name,email,password});

    if(user){
        res.status(201).json({
            id: user._id,
            name:user.name,
            email:user.email,
            token: Token(user._id),
        });
    }else{
        res.status(500);
        throw new Error('Invalid user data');
    }

}


const authUser =async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            id:user._id,
            name:user.name,
            email:user.email,
            token:Token(user._id),
        });
    }
    else{
        res.status(401);
        throw new Error("invalid user or user password");
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
        res.status(500);
        throw new Error('User not found');
    }
})

module.exports = {
    registerUser,authUser,getUserProfile
};