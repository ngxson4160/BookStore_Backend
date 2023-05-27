const express = require("express");

const cartController = require('../controllers/CartController')
const { loginMiddleware } = require("../middlewares/AuthenMiddleware");
const router = express.Router();


//add cart
router.get("/", loginMiddleware, cartController.getCart);

module.exports = router;
