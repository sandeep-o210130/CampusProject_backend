const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

let schema = mongoose.Schema({
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

schema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model(schema,"User")

module.exports = User;