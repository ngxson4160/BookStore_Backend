const connection = require("../config/db/db");

class UserDAO {
    checkUser(userName) {
        let sql = `SELECT id, password, role FROM user where BINARY userName = ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, userName, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    signUp(userName, firstName, lastName, password, gender, role, createdAt, dateOfBirth, email, phoneNumber, avatar) {
        console.log(arguments);
        let sql = `INSERT INTO user(userName, firstName, lastName, password, gender, role, createdAt, dateOfBirth, email, phoneNumber, avatar)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [...arguments], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    updatePassword(password, userName) {
        let sql = `UPDATE user SET password = ? WHERE userName = ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [...arguments], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    changeInfo(firstName, lastName, dateOfBirth, email, phoneNumber, gender, avatar, userId) {
        sql = `UPDATE user
                SET firstName = ?, lastName = ?, dateOfBirth = ?, email = ?, phoneNumber = ?, gender = ?, avatar = ?
                WHERE id = ?;`;
        return new Promise((resolve, reject) => {
            connection.query(sql, [...arguments], (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    updateUser(firstName, lastName, dateOfBirth, email, phoneNumber, gender, avatar, id) {
        let sql = `UPDATE user`;
        let conditions = [];
        let value = [];
        let params = [...arguments];

        if (firstName) {
            conditions.push("firstName = ?");
        }
        if (lastName) {
            conditions.push("lastName = ?");
        }
        if (dateOfBirth) {
            conditions.push("dateOfBirth = ?");
        }
        if (email) {
            conditions.push("email = ?");
        }
        if (phoneNumber) {
            conditions.push("phoneNumber = ?");
        }
        if (gender) {
            conditions.push("gender = ?");
        }
        if (avatar) {
            conditions.push("avatar = ?");
        }
        sql += " SET " + conditions.join(", ") + " WHERE id = ?";
        params.forEach((param) => {
            if (param) value.push(param);
        });
        return new Promise((resolve, reject) => {
            connection.query(sql, value, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }
}

module.exports = new UserDAO();
