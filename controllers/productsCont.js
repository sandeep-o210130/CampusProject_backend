const asyncHandler = require('express-async-handler')
const Product = require('../models/product_model.js')


const addProduct = asyncHandler(async(req,res)=>{
    const {name,description,image,price} = req.body;

    const product = new Product({name,description,image,price,userId:req.user._id})
    await product.save()
    res.status(201).json({message:"product added successfullt",product});
})

const getProducts = async(req,res)=>{
    const prod = await Product.find({})
    res.status(201).json({prod});
}


const getProductById = async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).json({message:'product not found'});
    }
    res.status(201).json(product);
}


const deleteProduct = async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(!product)
        res.status(404).json({message:'Product not found'});

    await product.deleteOne();

    res.status(201).json({message:'Product Deleted Successfully'})
}

const updateProduct = async(req,res)=>{
    const product = await Product.findById(req.params.id);
    let {name,description,image,price} = req.body;

    product.name = name || product.name;
    product.description= description || product.description;
    product.image = image || product.image;
    product.price = price || product.price;

    await product.save();

    res.status(201).json({message:"product updated successfully",product})

}

const placeBid = async(req,res)=>{
    const {amount} = req.body;

    const product = await Product.findById(req.user._id);

    if(!product){
        return res.status(501).json({message:'Product not found'});
    }

    const newBid = {
        userId : req.user._id,
        amount,
    };

    product.bids(newBid);
    product.highestBid = Math.max(amount,product.highestBid);

    await product.save();

    res.status(501).json({message:'Bid Placed Successfully',highestBid:product.highestBid})
}


module.exports = {addProduct,getProductById,getProducts,updateProduct,deleteProduct,placeBid}