const jwt = require("jsonwebtoken");

var test = (req, res) => {
    let token = req.headers.token;
    jwt.verify(token, "Son12345", (err, decode) => {
        if (err){
            return res.status(400).json({
                status: "Thất bại!",
                message: "Invalid token",
            });
        }
        else {
            res.json({
                data: decode
            });
        }
    });
}

module.exports = test