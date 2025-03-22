const jwt = require("jsonwebtoken")
const User = require("../models/user.js");

const protect = async(req,res,next)=>{
    let token;
    console.log("at protect middleware")
    console.log(req.headers.authorization)
    console.log(req.body)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            const decoded = await jwt.verify(token,process.env.SECRET_KEY);
            req.user = await User.findById(decoded.id).select("-password");
            console.log(req.user);
            next();
        }catch(err){
            console.log(err);
            
            res.status(500).json({'message':"error found in middleware"})
        }
    }
    else{
        res.status(500).json({'message':"error found in middleware"})
    }
}

module.exports = protect;