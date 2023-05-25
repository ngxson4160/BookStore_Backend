const express = require("express");
const upload =require('../ultils/UploadsFile')

const authorController = require("../controllers/AuthorController");

const router = express.Router();

//get list author
router.get("/", authorController.getListAuthor);
//add author
router.post("/", upload.single('image'), authorController.addAuthor);
//get detail author
router.get("/:id", authorController.getDetailAuthor);
module.exports = router;
