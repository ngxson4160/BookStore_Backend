const authorDAO = require("../DAO/author");

class AuthorController {
    getListAuthor(req, res) {
        authorDAO
            .getListAuthor()
            .then((data) => {
                if (data.length === 0) res.status(404).json({ message: "NOT FOUND" });
                else {
                    res.status(200).json({
                        message: "Thành công!",
                        total: data.length,
                        data,
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    addAuthor(req, res){
        console.log(req.body);
        res.status(200).json({
            message: 'Thành công!'
        })
    }
}

module.exports = new AuthorController();
