const cartItemDAO = require("../DAO/cartItem");

class CartController {
    getCart(req, res) {
        cartItemDAO
            .getCart(req.userInfo.id)
            .then((data) => {
                if (data.length === 0) {
                    return res.status(200).json({
                        status: "Thành công!",
                        totalItem: 0,
                        message: "Cart is empty",
                    });
                } else {
                    let totalPrice = data.reduce((total, current) => {
                        return total + current.totalPrice;
                    }, 0);
                    return res.status(200).json({
                        status: "Thành công!",
                        totalItem: data.length,
                        totalPrice,
                        books: data,
                    });
                }
            })
            .catch((err) => err);
    }

    addItemToCart(req, res) {
        if (req.body.quantity <= 0 || isNaN(req.body.quantity)) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Invalid quantity",
            });
        }
        if (!req.quantity) {
            cartItemDAO
                .insertItemToCart(req.userInfo.id, req.body.bookId, req.body.quantity)
                .then((data) =>
                    res.status(200).json({
                        status: "Thành công!",
                        message: "Thêm item thành công!"
                    })
                )
                .catch((err) => console.log(err));
        } else {
            cartItemDAO
                .updateItem(req.body.quantity, req.userInfo.id, req.body.bookId)
                .then((data) =>
                    res.status(200).json({
                        status: "Thành công!",
                        message: "Cập nhật item thành công!",
                    })
                )
                .catch((err) => console.log(err));
        }
    }

    updateItemInCart(req, res) {
        if (isNaN(req.body.quantity) || req.body.quantity === "") {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Invalid quantity",
            });
        }
        if (req.isBookExistInCart && req.body.quantity < 0 && Number(req.body.quantity) + req.quantity < 0) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Over amount item in cart",
            });
        }
        if (req.isBookExistInCart && req.body.quantity < 0 && Number(req.body.quantity) + req.quantity === 0) {
            cartItemDAO
                .deleteItem(req.userInfo.id, req.body.bookId)
                .then((data) => {
                    return res.status(200).json({
                        status: "Thành công!",
                        message: "Xóa items thành công!",
                    });
                })
                .catch((err) => console.log(err));
        }
        if (req.isBookExistInCart) {
            cartItemDAO
                .updateItem(req.body.quantity, req.userInfo.id, req.body.bookId)
                .then((data) => {
                    return res.status(200).json({
                        status: "Thành công!",
                        message: "Cập nhật item thành công",
                    });
                })
                .catch((err) => console.log(err));
        } else {
            return res.status(404).json({
                status: "Thất bại!",
                message: "Không tìm thấy item phù hợp",
            });
        }
    }

    deleteItemInCart(req, res) {
        if (req.isBookExistInCart) {
            cartItemDAO
                .deleteItem(req.userInfo.id, req.body.bookId)
                .then((data) => {
                    return res.status(200).json({
                        status: "Thành công!",
                        message: "Đã xóa bookId " + req.body.bookId,
                    });
                })
                .catch((err) => console.log(err));
        } 
        else {
            return res.status(404).json({
                status: "Thất bại!",
                message: "Không tìm thấy items tương ứng trong cart",
            });
        }
    }

    emptyCart(req, res) {
        cartItemDAO
            .emptyCart(req.userInfo.id)
            .then((data) => {
                if (data.affectedRows) {
                    return res.status(200).json({
                        status: "Thành công!",
                    });
                } else {
                    return res.status(400).json({
                        status: "Thất bại!",
                        message: "cart already empty",
                    });
                }
            })
            .catch((err) => console.log(err));
    }
}
module.exports = new CartController();
