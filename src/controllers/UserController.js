const jwt = require("jsonwebtoken");

const userDAO = require("../DAO/user");
const checkFormatData = require("../ultils/CheckFormatData");
const { cryptPassword, comparePassword } = require("../ultils/hashPassword");

const blacklist = require("../ultils/JwtConfig"); //store token expired

class UserController {
    signUp(req, res) {
        if (!(req.body.userName && req.body.firstName && req.body.lastName && req.body.password && req.body.gender)) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Thiếu trường thông tin!",
            });
        }
        if (req.body.email && !checkFormatData.isValidateEmail(req.body.email)) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Email không hợp lệ",
            });
        }
        if (req.body.dateOfBirth && !checkFormatData.isValidDateTime(req.body.dateOfBirth)) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Ngày sinh không hợp lệ!",
            });
        }
        if (req.body.phoneNumber && !checkFormatData.isValidPhoneNumber(req.body.phoneNumber)) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Số điện thoại không hợp lệ!",
            });
        }
        if (req.body.gender !== "male" && req.body.gender !== "female" && req.body.gender !== "other") {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Giới tính không hợp lệ!",
            });
        }

        if (req.body.password.length < 6) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Mật khẩủ tối thiểu 6 kí tự!",
            });
        }

        if (req.userInfo) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Đã tồn tại user này!",
            });
        }

        if (!req.body.avatar) req.body.avatar = null;

        cryptPassword(req.body.password, (err, hash) => {
            if (err) console.log(err);
            else {
                userDAO
                    .signUp(
                        req.body.userName,
                        req.body.firstName,
                        req.body.lastName,
                        hash,
                        req.body.gender,
                        "isUser",
                        new Date(),
                        req.body.dateOfBirth,
                        req.body.email,
                        req.body.phoneNumber,
                        req.body.avatar
                    )
                    .then((data) =>
                        res.status(200).json({
                            status: "Thành công!",
                            insertId: data.insertId,
                        })
                    )
                    .catch((err) => console.log(err));
            }
        });
    }

    signIn(req, res) {
        if (!req.userInfo) {
            return res.status(404).json({
                status: "Thất bại!",
                message: "Tài khoản hoặc mật khẩu không chính xác!",
            });
        }
        comparePassword(req.body.password, req.userInfo.password, (err, isPasswordMatch) => {
            if (err) console.log(err);
            else if (isPasswordMatch) {
                jwt.sign({ data: req.userInfo }, "Son12345", function (err, token) {
                    if (err) console.log(err);
                    else {
                        return res.status(200).json({
                            status: "Thành công!",
                            token: token,
                        });
                    }
                });
            } else {
                res.status(404).json({
                    status: "Thất bại!",
                    message: "Tài khoản hoặc mật khẩu không chính xác!",
                });
            }
        });
    }

    logOut(req, res) {
        let token = req.headers.authorization;
        if (blacklist.includes(token)) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Bạn đã logout trước đó rồi.",
            });
        } else {
            blacklist.push(token);
            return res.status(200).json({
                status: "Thành công!",
            });
        }
    }

    changePassword(req, res) {
        if (!req.body.currentPass || !req.body.newPass) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "newPass & current is required",
            });
        }
        if (req.body.newPass.length < 6) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Mật khẩu tối thiểu 6 kí tự",
            });
        }
        comparePassword(req.body.currentPass, req.userInfo.password, (err, isPasswordMatch) => {
            if (isPasswordMatch && req.body.newPass !== req.body.currentPass) {
                cryptPassword(req.body.newPass, (err, hash) => {
                    if (err) return console.log(err);
                    else {
                        userDAO
                            .updatePassword(hash, req.body.userName)
                            .then((data) => res.status(200).json({ status: "Thành công!" }))
                            .catch((err) => console.log(err));
                    }
                });
            } else if (isPasswordMatch && req.body.newPass === req.body.currentPass) {
                return res.status(400).json({
                    status: "Thất bại!",
                    message: "Mật khẩu mới trùng mật khẩu cũ",
                });
            } else {
                return res.status(200).json({
                    status: "Thất bại!",
                    message: "Mật khẩu hiện tại không đúng",
                });
            }
        });
    }

    updateUser(req, res) {
        if (
            !req.file &&
            !req.body.firstName &&
            !req.body.lastName &&
            !req.body.dateOfBirth &&
            !req.body.email &&
            !req.body.phoneNumber &&
            !req.body.gender
        ) {
            return res.status(400).json({
                status: "Thất bại",
                message: "Chọn ít nhất 1 thông tin muốn sửa",
            });
        }

        if (req.body.dateOfBirth && !checkFormatData.isValidDateTime(req.body.dateOfBirth)) {
            return res.status(400).json({
                status: "Thất bại",
                message: "Invalid dateTime, require YYYY-MM-DD",
            });
        }

        if (req.body.email && !checkFormatData.isValidateEmail(req.body.email)) {
            return res.status(400).json({
                status: "Thất bại",
                message: "Invalid email",
            });
        }

        if (req.body.phoneNumber && !checkFormatData.isValidPhoneNumber(req.body.phoneNumber)) {
            return res.status(400).json({
                status: "Thất bại",
                message: "Invalid phone number",
            });
        }

        if (req.body.gender !== "male" && req.body.gender !== "female" && req.body.gender !== "other") {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Giới tính không hợp lệ!",
            });
        }

        let avatar;
        if (req.file) {
            let avatarURL = "http://localhost:3000/uploads/" + req.file.filename;
            avatar = req.file ? avatarURL : null;
        }
        userDAO.updateUser(req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.email, req.body.phoneNumber, req.body.gender, avatar, req.userInfo.id)
            .then((data) => {
                if (data.changedRows) {
                    return res.status(200).json({
                        status: "Thành công!",
                    });
                } else {
                    return res.status(304).json({
                        status: "Thành công!",
                        message: "Không có gì sửa đổi",
                    });
                }
            })
            .catch((err) => console.log(err));
    }
}

module.exports = new UserController();
