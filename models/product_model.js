const mongoose = require('mongoose')
const { type } = require('os')

const bidSchmea = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})


const productschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        default:"image.png",
    },
    price:{
        type:Number,
        required:true,
    },
    bids:[bidSchmea],
    highestBid:{
        type:Number,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},  {
        timestamps:true,
}
)

const Product = mongoose.model("Product",productschema);

module.exports = Product;