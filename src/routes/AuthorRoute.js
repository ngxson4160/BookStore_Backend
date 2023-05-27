const express = require("express");
const upload = require("../ultils/UploadsFile");

const authorController = require("../controllers/AuthorController");
const { loginMiddleware, checkAdminAndManager } = require("../middlewares/AuthenMiddleware");
const router = express.Router();

//get list author
router.get("/", authorController.getListAuthor);
//add author
router.post("/", loginMiddleware, checkAdminAndManager, upload.single("image"), authorController.addAuthor);
//get detail author
router.get("/:id", authorController.getDetailAuthor);
module.exports = router;
