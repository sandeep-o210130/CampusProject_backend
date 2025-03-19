const asyncHandler = require("express-async-handler")
const Wallet = require("../models/wallet_model.js")
const razorpay = require("../utils/razor.js");


const getWallet = asyncHandler(async (req,res)=>{
    const wallet = await Wallet.findOne({userId:req.user._id})

    if(!wallet){
        return res.status(500).json({message:'Wallet Not Found'})
    }

    res.status(201).json({balance:wallet.balance})
});




const addMoney = asyncHandler(async(req,res)=>{
    const {amount} = req.body;

    if(!amount || amount<=0){
        return res.status(400).json({message:'Invalid Format'});
    }

    const wallet = await Wallet.findOne({userId:req.user._id});

    if(!wallet){
        return res.status(500).json({message:'wallet not found'});
    }

    const options = {
        amount:amount*100,
        currency:'INR',
        receipt:`receipt_${req.user._id}_${Date.now}`,
    };

    const orders = await razorpay.orders.create(options);

    res.json({orderId:orders.id});
})



const getTransactions = asyncHandler(async(req,res)=>{
    const wallet = await Wallet.findOne({userId:req.user._id});

    if(!wallet){
        return res.status(500).json({message:'wallet not found'});
    }

    res.status(200).json(wallet.transactions);
})


module.exports = {
    getWallet,addMoney,getTransactions
};