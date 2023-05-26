const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.cryptPassword = function (password, callback) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(password, salt, function (err, hash) {
            return callback(err, hash);
        });
    });
};

exports.comparePassword = function (plainPassword, hashPassword, callback) {
    bcrypt.compare(plainPassword, hashPassword, function (err, isPasswordMatch) {
        return err == null ? callback(null, isPasswordMatch) : callback(err);
    });
};

