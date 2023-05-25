const connection = require("../config/db/db");

class AuthorDAO {
    getListAuthor() {
        let sql = "SELECT * FROM Book_Store.author";
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    getDetailAuthor(id) {
        let sql = "SELECT * FROM Book_Store.author WHERE id = ?";
        return new Promise((resolve, reject) => {
            connection.query(sql, id, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    addAuthor(image, name, description, dateOfBirth) {
        let sql = `INSERT INTO Book_Store.author(image, name, description, dateOfBirth) VALUES(?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [image, name, description, dateOfBirth], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}

module.exports = new AuthorDAO();
