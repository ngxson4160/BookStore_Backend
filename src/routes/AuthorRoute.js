const express = require("express");
const multer = require("multer");

const authorController = require("../controllers/AuthorController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/home/nguyenson/Workspace/BookStore_Backend/src/public/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        let originalname = file.originalname;
        let extension = originalname.substring(originalname.lastIndexOf('.'));
        let filename = file.fieldname + '-' + uniqueSuffix + extension;
        req.filename = filename;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage })

router.get("/", authorController.getListAuthor);
router.post("/", upload.single('image'), authorController.addAuthor);
module.exports = router;
