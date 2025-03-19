const Razorpay = require("razorpay");
const dotenv = require('dotenv');

dotenv.config();

const razorpay = new Razorpay({
    key_id:process.env.RAZOR_ID,
    key_secret:process.env.RAZOR_SECRET,
});

module.exports = razorpay;