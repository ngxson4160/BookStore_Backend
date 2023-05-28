const bookDAO = require('../DAO/book')
const cartItemDAO = require('../DAO/cartItem')

exports.checkBookExist = (req, res, next) => {
    bookDAO
        .getDetailBook(req.body.bookId)
        .then((data) => {
            if (data.length === 0) {
                res.status(404).json({
                    status: "Thất bại!",
                    message: "Invalid bookId",
                });
            } else {
                next();
            }
        })
        .catch((err) => console.log(err));
};

exports.checkItemsInCart = (req, res, next) => {
        cartItemDAO.getCartItem(req.userId, req.body.bookId)
            .then((data) =>{
                if(data.length === 0){
                    req.isBookExistInCart = false;
                    next();
                }else{
                    req.isBookExistInCart = true;
                    req.quantity = data[0].quantity;
                    next();
                }
            })
            .catch((err) => console.log(err))
}
// module.exports = checkBookExist
