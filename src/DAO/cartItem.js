const connection = require("../config/db/db");

class CartItemDAO {
    getCart(userId) {
        let sql = `SELECT user.id as userId, book.id as bookId, book.name, book.salePrice as price, cartItem.quantity, (cartItem.quantity * book.salePrice) as price
                    FROM cartItem 
                        JOIN user on user.id = cartItem.userId
                        JOIN book on book.id = cartItem.bookId
                     WHERE user.userName = ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, userId, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}

module.exports = new CartItemDAO();
