const connection = require("../config/db/db");

class UserDAO {
    checkUserName(userName){
        let sql = `SELECT password FROM user where userName = ?`
        return new Promise((resolve, reject) => {
            connection.query(sql, userName, (err, data) => {
                if(err) reject(err);
                else resolve(data)
            })
        })
    }

    signUp(userName, firstName, lastName, password, gender, role, createdAt, dateOfBirth, email, phoneNumber, avatar) {
        let sql = `INSERT INTO user(userName, firstName, lastName, password, gender, role, createdAt, dateOfBirth, email, phoneNumber, avatar)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [...arguments], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}

module.exports = new UserDAO();
