const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/home/nguyenson/Workspace/BookStore_Backend/src/public/uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        let originalname = file.originalname; //nxbtre_thumb_1234.jpg
        let extension = originalname.substring(originalname.lastIndexOf(".")); //.jpg
        let filename = originalname.substring(0, originalname.lastIndexOf(".")) + "-" + uniqueSuffix + extension; //nxbtre_thumb_1234 + '-' + ...+ .jpg
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
