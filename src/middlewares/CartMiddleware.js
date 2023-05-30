const bookDAO = require('../DAO/book')
const cartItemDAO = require('../DAO/cartItem')

exports.checkBookExist = (req, res, next) => {
    if(!req.body.bookId){
        return res.status(400).json({
            status: "Thất bại!",
            message: "bookId is required",
        });
    }
    bookDAO
        .getDetailBook(req.body.bookId)
        .then((data) => {
            if (data.length === 0) {
                res.status(404).json({
                    status: "Thất bại!",
                    message: "book does not exist",
                });
            } else {
                next();
            }
        })
        .catch((err) => console.log(err));
};

exports.checkItemsInCart = (req, res, next) => {
        cartItemDAO.getCartItem(req.userInfo.id, req.body.bookId)
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
