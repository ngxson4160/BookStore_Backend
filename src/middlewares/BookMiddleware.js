const bookDAO = require("../DAO/book");
const fs = require("fs");

exports.checkBookExist = (req, res, next) => {
    if (!req.body.bookId) {
        return res.status(400).json({
            status: "Thất bại!",
            message: "bookId is required",
        });
    }
    bookDAO.getDetailBook(req.body.bookId)
        .then((data) => {
            if (data.length === 0) {
                res.status(404).json({
                    status: "Thất bại!",
                    message: "book does not exist",
                });

                if (req.files) {
                    req.files.forEach((file) => {
                        fs.unlink(file.path, (err) => {
                            if (err) {
                                console.error(`Error deleting file ${filePath}:`, err);
                            }
                        });
                    });
                }
            } else {
                next();
            }
        })
        .catch((err) => console.log(err));
};
