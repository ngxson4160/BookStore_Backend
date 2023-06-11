const bookDAO = require("../DAO/book");
const checkFormatData = require("../ultils/CheckFormatData");

class BookController {
    /**CÓ 2 CÁCH LẤY KẾT QUẢ QUERY. 1 LÀ DÙNG ASYNC/AWAIT NHƯ SAU VÀ 2 LÀ DÙNG TRỰC TIẾP PROMISE NHƯ CÁC FUNCTION BÊN DƯỚI*/
    // async getListBook(req, res) {
    //     let page = 1,
    //         pageSize = 10;
    //     if (req.query.page) page = req.query.page;
    //     try {
    //         const books = await bookDAO.getListBook(Number((page - 1) * pageSize), pageSize, req.query.author, req.query.price);
    //         if (books.length === 0) {
    //             res.status(404).json({
    //                 status: "NOT FOUND",
    //                 books: null,
    //             });
    //         } else {
    //             books.forEach((value, index) => {
    //                 if (typeof value.image === "string") {
    //                     books[index].image = JSON.parse(value.image);
    //                 }
    //             });
    //             res.json({
    //                 status: "Thành công",
    //                 total: books.length,
    //                 page: Number(page),
    //                 pageSize: pageSize,
    //                 books: books,
    //             });
    //         }
    //     } catch (err) {
    //         console.error(err); // Xử lý lỗi
    //     }
    // }

    getListBook(req, res) {
        let page = 1,
            pageSize = 50;
        if (req.query.page) page = req.query.page;
        bookDAO
            .getListBook(Number((page - 1) * pageSize), pageSize, req.query.author, req.query.price, req.query.rating)
            .then((data) => {
                if (data.length === 0) {
                    res.status(404).json({
                        status: "NOT FOUND",
                        data: null,
                    });
                } else {
                    data.forEach((value, index) => {
                        if (typeof value.image === "string") {
                            data[index].image = JSON.parse(value.image);
                        }
                    });
                    res.json({
                        status: "Thành công",
                        total: data.length,
                        page: Number(page),
                        pageSize: pageSize,
                        data: data,
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    getDetailBook(req, res) {
        bookDAO
            .getDetailBook(req.params.id)
            .then((data) => {
                if (data.length === 0) {
                    res.status(404).json({
                        status: "Thất bại!",
                        message: "NOT FOUND",
                    });
                } else {
                    data.forEach((value, index) => {
                        if (typeof value.image === "string") {
                            data[index].image = JSON.parse(value.image);
                        }
                    });
                    res.status(200).json({
                        status: "Thành công!",
                        data: data,
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    addBook(req, res) {
        // let images = [];
        // req.files.forEach((image) => {
        //     images = [...images, "http://localhost:3000/uploads/" + image.filename];
        // });
        if (
            !(
                req.body.name &&
                req.files.length &&
                req.body.authorID &&
                req.body.publicationDate &&
                req.body.description &&
                req.body.importPrice &&
                req.body.originalPrice &&
                req.body.salePrice &&
                req.body.publisher &&
                req.body.quantity &&
                req.body.size
            ) ||
            !checkFormatData.isValidDateTime(req.body.publicationDate)
        ) {
            res.status(400).json({
                status: "Thất bại!",
                message: "Invalid field, all is required & publicationDate: YYYY-MM-DD",
            });
            return;
        }

        let images = [];
        req.files.forEach((image) => {
            images = [...images, "http://localhost:3000/uploads/" + image.filename];
        });
        bookDAO
            .addBook(
                req.body.name,
                JSON.stringify(images),
                req.body.authorID,
                req.body.publicationDate,
                req.body.description,
                req.body.importPrice,
                req.body.originalPrice,
                req.body.salePrice,
                req.body.publisher,
                req.body.quantity,
                req.body.size
            )
            .then((data) =>
                res.status(200).json({
                    status: "Thành công!",
                    insertId: data.insertId,
                })
            )
            .catch((err) => console.log(err));
    }

    updateBook(req, res) {
        let images = [];
        if (req.files.length) {
            req.files.forEach((image) => {
                images = [...images, "http://localhost:3000/uploads/" + image.filename];
            });
        } else {
            images = null;
        }
        if (req.body.publicationDate && !checkFormatData.isValidDateTime(req.body.publicationDate)) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Invalid publicationDate, require YYYY-MM-DD",
            });
        }
        bookDAO
            .updateBook(
                req.body.name,
                JSON.stringify(images),
                req.body.authorID,
                req.body.publicationDate,
                req.body.description,
                req.body.importPrice,
                req.body.originalPrice,
                req.body.salePrice,
                req.body.publisher,
                req.body.quantity,
                req.body.size,
                req.body.bookId
            )
            .then((data) => {
                if (data.changedRows) {
                    return res.status(200).json({
                        status: "Thành công!",
                    });
                } else {
                    return res.status(304).json({
                        status: "Thành công!",
                        message: "Không có gì sửa đổi",
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    deleteBook(req, res) {
        bookDAO.deleteBook(req.body.bookId)
            .then(data =>{
                return res.status(200).json({
                    status: 'Thành công!'
                })
            })
            .catch(err => console.log(err))
    }
}
module.exports = new BookController();
