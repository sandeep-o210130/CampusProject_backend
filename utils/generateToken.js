const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

const Token = (id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"30d"})
}

module.exports = Token;