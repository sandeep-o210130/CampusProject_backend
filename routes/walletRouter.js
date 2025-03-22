const express = require("express");
const router = express.Router()
const {getWallet,addMoney,getTransactions,verifyPayment} = require("../controllers/walletCont.js")
const protect = require("../middleware/protect_middleware.js")

router.get('/getWallet',protect,getWallet);
router.post('/add-money',protect,addMoney);
router.get('/getTransactions',protect,getTransactions);
router.post('/verifyPayment',protect,verifyPayment)

module.exports = router;