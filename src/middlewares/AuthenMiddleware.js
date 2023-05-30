const jwt = require("jsonwebtoken");
const blacklist = require("../ultils/JwtConfig");
const userDAO = require('../DAO/user')

//Nếu có user -> req.userInfo = {id: , password: , role}
exports.checkUserExist = async (req, res, next) => {
    if(!req.body.userName){
        return res.status(400).json({
            status: 'Thất bại!',
            message: 'userName is required'
        })
    }
    userDAO.checkUser(req.body.userName)
        .then((data) => {
            if (data.length === 0) {
                next();
            } else {
                req.userInfo = data[0];
                next();
            }
        })
        .catch((err) => console.log(err));
};

//Nếu thành công -> req.userInfo = {id: , password: , role}
exports.loginMiddleware = (req, res, next) => {
    let token = req.headers.token;
    if (!token) {
        return res.status(400).json({
            status: "Thất bại!",
            message: "Token required",
        });
    }
    if (blacklist.includes(token)) {
        return res.status(400).json({
            status: "Thất bại!",
            message: "Token expired",
        });
    }
    jwt.verify(token, "Son12345", (err, decode) => {
        if (err) {
            return res.status(400).json({
                status: "Thất bại!",
                message: "Invalid token",
            });
        } else {
            req.userInfo = decode.data;
            next();
        }
    });
};

exports.checkAdminAndManager = (req, res, next) => {
    if (req.userInfo.role === "isUser") {
        return res.status(401).json({
            status: "Thất bại",
            message: "Bạn không có quyền",
        });
    } else next();
};
