const express = require("express");
const protect = require("../middleware/protect_middleware.js");
const router = express.Router()

const {registerUser,authUser,getUserProfile} = require("../controllers/userCont.js")


router.post('/register',registerUser);
router.post('/login',authUser);
router.post('/profile',protect,getUserProfile);

module.exports = router;