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
}

module.exports = new AuthorDAO();
