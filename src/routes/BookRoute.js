const express = require("express");
const router = express.Router();

const BookController = require("../controllers/BookController");
const upload = require("../ultils/UploadsFile");
const {loginMiddleware, checkAdminAndManager} = require('../middlewares/AuthenMiddleware');
const {checkBookExist} = require('../middlewares/BookMiddleware');

//get list book: localhost:3000/api/books?q=Mắt&page=1&author=6&price=50000,70000
router.get("/", BookController.getListBook);

//get detail book: localhost:3000/api/books/36
router.get("/:id", BookController.getDetailBook);

//add book: localhost:3000/api/books
router.post("/", loginMiddleware, checkAdminAndManager, upload.array("image", 10), BookController.addBook);

//update book: localhost:3000/api/books/update
router.put("/update", loginMiddleware, checkAdminAndManager, upload.array("image", 10), checkBookExist, BookController.updateBook);

//delete book: localhost:3000/api/books/delete
router.delete("/delete", loginMiddleware, checkAdminAndManager, checkBookExist, BookController.deleteBook);

module.exports = router;
