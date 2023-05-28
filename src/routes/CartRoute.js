const express = require("express");

const cartController = require("../controllers/CartController");
const { loginMiddleware } = require("../middlewares/AuthenMiddleware");
const {checkBookExist, checkItemsInCart} = require("../middlewares/CartMiddleware");
const router = express.Router();

//get cart
router.get("/", loginMiddleware, cartController.getCart);
//add items to Cart
router.post("/", loginMiddleware, checkBookExist, checkItemsInCart, cartController.addItemToCart);
//update item
router.post("/update", loginMiddleware, checkBookExist, checkItemsInCart, cartController.updateItemInCart);
//delete item
router.post("/delete", loginMiddleware, checkBookExist, checkItemsInCart, cartController.deleteItemInCart);
//empty item
router.post("/empty", loginMiddleware, cartController.emptyCart);

module.exports = router;
