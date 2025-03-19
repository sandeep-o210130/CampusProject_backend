const jwt = require("jsonwebtoken")
const User = require("../models/user.js");

const protect = async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.SECRET_KEY);

            req.user = await User.findById(decoded.id).select("-password");
            next();
        }catch(err){
            console.log(err);
            req.status(401);
            throw new Error('Not authorized,token failed');
        }
    }
    else{
        res.status(500);
        throw new Error('Not authorized , No token');
    }
}

module.exports = protect;