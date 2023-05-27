const authorDAO = require("../DAO/author");
const checkFormateData = require("../ultils/CheckFormatData");

class AuthorController {
    getListAuthor(req, res) {
        authorDAO
            .getListAuthor()
            .then((data) => {
                if (data.length === 0) res.status(404).json({ status: "NOT FOUND" });
                else {
                    res.status(200).json({
                        status: "Thành công!",
                        total: data.length,
                        data,
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    getDetailAuthor(req, res) {
        authorDAO.getDetailAuthor(req.params.id).then((data) => {
            if (data.length === 0) {
                res.status(404).json({
                    status: "Thất bại!",
                    message: "NOT FOUND",
                });
            } else {
                res.status(200).json({
                    status: "Thành công!",
                    data: data,
                });
            }
        });
    }

    addAuthor(req, res) {
        if (!req.body.name || (req.body.dateOfBirth && !checkFormateData.isValidDateTime(req.body.dateOfBirth))) {
            res.status(400).json({
                status: "Thất bại!",
                message: "Invalid field, name is required & dateTime: YYYY-MM-DD",
            });
        } else {
            let imageURL = "http://localhost:3000/uploads/" + req.file.filename;
            let image = req.file ? imageURL : null;
            let description = req.body.description ? req.body.description : null;
            let dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : null;
            authorDAO
                .addAuthor(image, req.body.name, description, dateOfBirth)
                .then((data) =>
                    res.status(200).json({
                        status: "Thành công!",
                        insertId: data.insertId,
                    })
                )
                .catch((err) => console.log(err));
        }
    }
}

module.exports = new AuthorController();
