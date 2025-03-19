const express = require("express");
const router = express.Router()
const {getWallet,addMoney,getTransactions} = require("../controllers/walletCont.js")
const protect = require("../middleware/protect_middleware.js")

router.get('/',protect,getWallet);
router.post('/add-money',protect,addMoney);
router.get('/transactions',protect,getTransactions);


module.exports = router;