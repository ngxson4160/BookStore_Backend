const jwt = require("jsonwebtoken");
const blacklist = require("../ultils/JwtConfig");

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
        if (err){
            return res.status(400).json({
                status: "Thất bại!",
                message: "Invalid token",
            });
        }
        else {
            req.role = decode.data[0].role;
            req.userName = decode.data[0].userName;
            next();
        }
    });
};

exports.checkAdminAndManager = (req, res, next) => {
    if(req.role === 'isUser') {
        return res.status(401).json({
            status: 'Thất bại',
            message: 'Bạn không có quyền'
        })
    }else next();
}

