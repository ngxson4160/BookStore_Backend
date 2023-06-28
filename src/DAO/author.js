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
            connection.query(sql, [...arguments], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    updateAuthor(image, name, description, dateOfBirth, id){
        let sql = `UPDATE author`;
        let conditions = [];
        let value = [];
        let params = [...arguments]

        if (image) {
            conditions.push("image = ?");
        }
        if (name) {
            conditions.push("name = ?");
        }
        if (description) {
            conditions.push("description = ?");
        }
        if (dateOfBirth) {
            conditions.push("dateOfBirth = ?");
        }
        sql += ' SET ' + conditions.join(', ') + ' WHERE id = ?';
        params.forEach(param => {
            if(param) value.push(param);
        })
        return new Promise((resolve, reject) => {
            connection.query(sql, value ,(err, data) =>{
                if(err) reject(err);
                else resolve(data)
            })
        })
    }
}

module.exports = new AuthorDAO();
