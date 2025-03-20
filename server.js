const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()
const userRoutes = require("./routes/userRoutes.js");
const walletRoutes = require("./routes/walletRouter.js");


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected successfully");
})
.catch(()=>{
    console.log("Disconnected successfully");
})


app.listen(process.env.port,()=>{
    console.log(`listening at port:- ${process.env.PORT}`)
})

app.get("/",(req,res)=>{
    res.send("Campus Project is preparing bro");
})

// Use:-

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

// ROUTES:-

app.use('/api/users',userRoutes);

app.use('/api/wallet',walletRoutes);