const express = require("express");
const router = express.Router();
const BookController = require("../controllers/BookController");

//homepage
router.use("/", BookController.getListBook);

module.exports = router;
