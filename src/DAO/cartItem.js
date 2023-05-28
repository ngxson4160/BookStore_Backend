const connection = require("../config/db/db");

class CartItemDAO {
    getCart(userId) {
        let sql = `SELECT book.id as bookId, book.name, book.salePrice as price, cartItem.quantity, (cartItem.quantity * book.salePrice) as totalPrice
                    FROM cartItem 
                        JOIN user on user.id = cartItem.userId
                        JOIN book on book.id = cartItem.bookId
                     WHERE user.id = ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, userId, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    getCartItem(userId, bookId) {
        let sql = `SELECT cartItem.quantity
                    FROM cartItem 
                    WHERE cartItem.userId = ? AND cartItem.bookId = ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [...arguments], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
    
    insertItemToCart(userId, bookId, quantity){
        let sql = `INSERT INTO cartItem(userId, bookId, quantity)
                    VALUES(?, ?, ?)`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [...arguments], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    updateItem(amount, userId, bookId) {
        let sql = `UPDATE cartItem 
                    SET cartItem.quantity = cartItem.quantity + ?
                    WHERE cartItem.userId = ? AND cartItem.bookId = ?;`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [...arguments], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    deleteItem(userId, bookId){
        let sql = `DELETE FROM cartItem 
                WHERE cartItem.userId = ? AND cartItem.bookId = ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [...arguments], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    emptyCart(userId){
        let sql = `DELETE FROM cartItem 
                    WHERE cartItem.userId = ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, userId, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}

module.exports = new CartItemDAO();
