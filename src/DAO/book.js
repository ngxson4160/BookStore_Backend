const connection = require("../config/db/db");

class BookDAO {
    getListBook(page, pageSize) {
        let sql = `SELECT book.id, book.name, book.img, book.sold, book.description, author.name AS author, book.importPrice, book.originalPrice, book.salePrice, book.publisher, book.quantity, book.size
                    FROM book book
                        JOIN author ON author.id = book.authorID
                    where author.id = ?
                    LIMIT ${page}, ${pageSize}`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [true],function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getBookBySearch(q, page, pageSize) {
        let sql = `SELECT book.id, book.name, book.img, book.sold, book.description, author.name AS author, book.importPrice, book.originalPrice, book.salePrice, book.publisher, book.quantity, book.size
                    FROM book book
                        JOIN author ON author.id = book.authorID
                    WHERE 
                        author.name like '%${q}%'
                        or book.description like '%${q}%'    
                    LIMIT ${page}, ${pageSize}`;
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = new BookDAO();
