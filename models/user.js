const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},
    {
        timestamps:true,
    }
);


schema.pre('save',async function(next){
    if(!this.isModified('password'))
            next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})



const User = mongoose.model("User",schema)

module.exports = User;