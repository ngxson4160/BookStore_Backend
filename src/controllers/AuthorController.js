const authorDAO = require("../DAO/author");

function isValidDateTime(dateTimeString) {
    // Kiểm tra định dạng ngày tháng hợp lệ (ví dụ: 'YYYY-MM-DD' hoặc 'YYYY-M-D')
    const dateTimeRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
    return dateTimeRegex.test(dateTimeString);
}

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

    addAuthor(req, res) {
        if (Object.keys(req.body).length === 0 || !req.body.name || (req.body.dateOfBirth && !isValidDateTime(req.body.dateOfBirth))) {
            res.status(400).json({
                status: "Thất bại!",
                message: "Invalid field, name is required & dateTime: YYYY-MM-DD",
            });
        }else {
            let tmpImg = 'http://localhost:3000/uploads/' + req.filename;
            let image = req.file ? tmpImg : null;
            let description = req.body.description ? req.body.description: null;
            let dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth: null;
            authorDAO
                .addAuthor(image, req.body.name, description, dateOfBirth)
                .then((value) =>
                    res.status(200).json({
                        status: "Thành công!",
                    })
                )
                .catch((err) => console.log(err));
        }
    }
}

module.exports = new AuthorController();
