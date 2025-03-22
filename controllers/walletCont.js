const asyncHandler = require("express-async-handler")
const Wallet = require("../models/wallet_model.js")
const razorpay = require("../utils/razor.js");
const crypto = require('crypto')
const dotenv = require('dotenv')

dotenv.config()

const getWallet = asyncHandler(async (req,res)=>{
    let wallet = await Wallet.findOne({userId:req.user._id})

    if(!wallet){
        wallet = new Wallet({userId:req.user._id,balance:0})
        await wallet.save();
        console.log("New wallet created:-",wallet);
    }

    res.status(201).json({balance:wallet.balance})
});




const addMoney = asyncHandler(async(req,res)=>{
    const {amount} = req.body;
    console.log("amount bro:-",amount);
    if(!amount || amount<=0){
        return res.status(400).json({message:'Invalid Format'});
    }

    const wallet = await Wallet.findOne({userId:req.user._id});
    console.log(wallet);
    if(!wallet){
        return res.status(500).json({message:'wallet not found'});
    }

    const options = {
        amount:amount*100,
        currency:'INR',
        receipt:`receipt_${req.user._id}}`,
    };

    console.log("Razor pay:-",options);

    try{
        const orders = await razorpay.orders.create(options);
        console.log(orders.id);
        res.status(200).json({orderId:orders.id});
    }
    catch(error){
        console.error("Razorpay errors:-",error);
        res.status(500).json({message:'Error creating razorpay order'})
    }
})


const verifyPayment = async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}  = req.body;

    const generatedSignature = crypto
        .createHmac('sha256',process.env.RAZOR_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
    console.log(generatedSignature);
    if(generatedSignature!==razorpay_signature)
            return res.status(500).json({message:'Invalid Payment signature'})
    
    const wallet = await Wallet.findOne({userId:req.user._id});
    console.log(wallet)
    if(!wallet)
        return res.status(500).json({message:'Wallet not found'})

    const amount  = parseFloat(req.body.amount)
    console.log(amount);
    wallet.balance+=amount;
    wallet.transactions.push({amount,transactionType:'CREDIT',description:'Added money to wallet',date:new Date()})

    await wallet.save();

    res.status(200).json({message:'Payment verified and wallet updated successfully'})
}


const getTransactions = asyncHandler(async(req,res)=>{
    const wallet = await Wallet.findOne({userId:req.user._id});

    if(!wallet){
        return res.status(500).json({message:'wallet not found'});
    }

    res.status(200).json(wallet.transactions);
})


module.exports = {
    getWallet,addMoney,getTransactions,verifyPayment
};