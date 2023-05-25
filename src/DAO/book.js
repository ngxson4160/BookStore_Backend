const connection = require("../config/db/db");

class BookDAO {
    getListBook(page, pageSize, authorID, price, rating) {
        let sql = `SELECT book.id, book.name, book.image, book.sold, book.description, author.name AS author, book.importPrice, book.originalPrice, book.salePrice, 
                        book.publisher, book.quantity, book.size, book.rating
                    FROM book 
                        JOIN author ON author.id = book.authorID
                    `;
        let conditions = [];
        let valueConditions = [];
        if (authorID) {
            conditions.push("author.id = ?");
            valueConditions.push(authorID);
        }
        if (price) {
            conditions.push("book.salePrice between ? AND ?");
            valueConditions.push(...price.split(","));
        }
        if (rating) {
            conditions.push("book.rating >= ?");
            valueConditions.push(rating);
        }
        if (conditions.length > 0) {
            sql += "WHERE " + conditions.join(" AND ");
        }
        sql += ` LIMIT ${page}, ${pageSize}`;
        return new Promise((resolve, reject) => {
            connection.query(sql, valueConditions, function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getBookBySearch(q, page, pageSize, authorID, price, rating) {
        let sql = `SELECT book.id, book.name, book.image, book.sold, book.description, author.name AS author, book.importPrice, book.originalPrice, book.salePrice, book.publisher, book.quantity, book.size
                    FROM book 
                        JOIN author ON author.id = book.authorID
                    WHERE 
                        (author.name like '%${q}%' OR book.name like '%${q}%')`;
        let conditions = []; 
        let valueConditions = [];
        if(authorID){
            conditions.push('author.id = ?');
            valueConditions.push(authorID);
        }
        if(price){
            conditions.push('book.salePrice between ? AND ?');
            valueConditions.push(...price.split(','));
        }
        if(rating){
            conditions.push('book.rating = ?');
            valueConditions.push(rating);
        }

        if(conditions.length > 0) {
            sql += ' AND ' + conditions.join(' AND ')
        }

        sql += ` LIMIT ${page}, ${pageSize}`;
        return new Promise((resolve, reject) => {
            connection.query(sql, valueConditions,(err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    addBook(name, image, authorID, publicationDate, description, importPrice, originalPrice, salePrice, publisher, quantity, size){
        let sql = `INSERT INTO Book_Store.book(name, image, authorID, publicationDate, description, importPrice, originalPrice, salePrice, publisher, quantity, size)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
        let values = [...arguments];
        return new Promise((resolve, reject) => {
            connection.query(sql, [...arguments],(err,  data) => {
                if(err) reject(err)
                else{
                    resolve(data)
                }
            })
        })
    }

    getDetailBook(id){
        let sql = `SELECT book.id, book.name, book.image, book.sold, book.description, author.name AS author, book.importPrice, book.originalPrice, book.salePrice, 
                        book.publisher, book.quantity, book.size, book.rating
                    FROM book 
                    JOIN author ON author.id = book.authorID
                    WHERE book.id = ?`
        return new Promise((resolve, reject) => {
            connection.query(sql, id, (err, data) => {
                if(err) reject(err);
                else resolve(data);
            })
        })
    }
}

module.exports = new BookDAO();
