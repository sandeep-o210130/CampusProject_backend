const express = require("express")
const router = express.Router()
const protect = require('../middleware/protect_middleware.js')

const {addProduct,getProductById,getProducts,updateProduct,deleteProduct,placeBid} = require('../controllers/productsCont.js')

router.post('/add',protect,addProduct)
router.get("/",getProducts)
router.get("/:id",getProductById)
router.delete("/:id",protect,deleteProduct);
router.put("/:id",protect,updateProduct);
router.post("/:id/bid",protect,placeBid);

module.exports = router;