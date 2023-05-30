const express = require("express");
const upload = require("../ultils/UploadsFile");

const authorController = require("../controllers/AuthorController");
const { loginMiddleware, checkAdminAndManager } = require("../middlewares/AuthenMiddleware");
const router = express.Router();

//get list author: localhost:3000/api/authors
router.get("/", authorController.getListAuthor);

//add author: localhost:3000/api/authors
router.post("/", loginMiddleware, checkAdminAndManager, upload.single("image"), authorController.addAuthor);

//get detail author: localhost:3000/api/authors/85
router.get("/:id", authorController.getDetailAuthor);

//update author: localhost:3000/api/authors/update
router.put("/update", loginMiddleware, checkAdminAndManager, upload.single("image"), authorController.updateAuthor);
module.exports = router;
