const jwt = require("jsonwebtoken");

const userDAO = require("../DAO/user");
const checkFormatData = require("../ultils/CheckFormatData");
const { cryptPassword, comparePassword } = require("../ultils/hashPassword");

const blacklist = require("../ultils/JwtConfig"); //store token expired

class UserController {
    async signUp(req, res) {
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

        try {
            let data = await userDAO.checkUserName(req.body.userName);
            if (data.length > 0) {
                return res.status(400).json({
                    status: "Thất bại!",
                    message: "Đã tồn tại user này!",
                });
            }
        } catch (err) {
            console.log(err);
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
                        'isUser',
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

    async signIn(req, res) {
        let data;
        try {
            data = await userDAO.checkUserName(req.body.userName);
            if (data.length === 0) {
                return res.status(404).json({
                    status: "Thất bại!",
                    message: "Tải khoản hoặc mật khẩu không chính xác!",
                });
            }
        } catch (error) {
            console.log(error);
        }

        comparePassword(req.body.password, data[0].password, (err, isPasswordMatch) => {
            if (err) console.log(err);
            else if (isPasswordMatch) {
                jwt.sign({ data: data }, "Son12345", function (err, token) {
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
                    message: "Tải khoản hoặc mật khẩu không chính xác!",
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

}

module.exports = new UserController();