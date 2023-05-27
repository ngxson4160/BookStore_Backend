const cartItemDAO = require("../DAO/cartItem");

class BookController {
    getCart(req, res) {
        cartItemDAO
            .getCart(req.userName)
            .then((data) => {
                if (data.length === 0) {
                    return res.status(200).json({
                        status: "Thành công!",
                        totalItem: 0,
                        message: 'Cart is empty'
                    });
                } else {
                    let totalPrice = data.reduce((total, current) => {
                        return (total + current.price)
                    }, 0);
                    return res.status(200).json({
                        status: "Thành công!",
                        totalItem: data.length,
                        totalPrice,
                        books: data
                    });
                }
            })
            .catch((err) => err);
    }
}
module.exports = new BookController();
