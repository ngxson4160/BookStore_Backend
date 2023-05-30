const express = require("express");

const cartController = require("../controllers/CartController");
const { loginMiddleware } = require("../middlewares/AuthenMiddleware");
const {checkItemsInCart} = require("../middlewares/CartMiddleware");
const {checkBookExist} = require("../middlewares/BookMiddleware");
const router = express.Router();

//get cart: localhost:3000/api/carts
router.get("/", loginMiddleware, cartController.getCart);

//add items to Cart: localhost:3000/api/carts
router.post("/", loginMiddleware, checkBookExist, checkItemsInCart, cartController.addItemToCart);

//update item: localhost:3000/api/carts/update
router.put("/update", loginMiddleware, checkBookExist, checkItemsInCart, cartController.updateItemInCart);

//delete item: localhost:3000/api/carts/delete
router.delete("/delete", loginMiddleware, checkBookExist, checkItemsInCart, cartController.deleteItemInCart);

//empty item: localhost:3000/api/carts/empty
router.delete("/empty", loginMiddleware, cartController.emptyCart);

module.exports = router;
