const express = require("express");
const router = express.Router();

const BookController = require("../controllers/BookController");
const upload = require("../ultils/UploadsFile");
const {loginMiddleware, checkAdminAndManager} = require('../middlewares/AuthenMiddleware')

//get list book
router.get("/", BookController.getListBook);
//add book
router.post("/", loginMiddleware, checkAdminAndManager, upload.array("image", 6), BookController.addBook);
//get detail book
router.get("/:id", BookController.getDetailBook);

module.exports = router;
