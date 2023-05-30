const authorDAO = require("../DAO/author");
const checkFormatData = require("../ultils/CheckFormatData");

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
        if (!req.body.name || (req.body.dateOfBirth && !checkFormatData.isValidDateTime(req.body.dateOfBirth))) {
            res.status(400).json({
                status: "Thất bại!",
                message: "Invalid field, name is required & dateTime: YYYY-MM-DD",
            });
        } else {
            let image;
            if(req.file){
                let imageURL = "http://localhost:3000/uploads/" + req.file.filename;
                image = req.file ? imageURL : null;
            }
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

    updateAuthor(req, res){

        if(!req.body.id){
            return res.status(400).json({
                status: 'Thất bại',
                message: 'Thiếu bookId'
            })
        }

        if(!req.file && !req.body.name && !req.body.description && !req.body.dateOfBirth){
            return res.status(400).json({
                status: 'Thất bại',
                message: 'Chọn ít nhất 1 thông tin muốn sửa'
            })
        }

        if(req.body.dateOfBirth && !checkFormatData.isValidDateTime(req.body.dateOfBirth)){
            return res.status(400).json({
                status: 'Thất bại',
                message: 'Invalid dateTime, require YYYY-MM-DD'
            })
        }

        let image;
        if(req.file){
            let imageURL = "http://localhost:3000/uploads/" + (req.file.filename);
            image = req.file ? imageURL : null;
        }
        authorDAO.updateAuthor(image, req.body.name, req.body.description, req.body.dateOfBirth, req.body.id)
            .then(data => {
                if(data.changedRows){
                    return res.status(200).json({
                        status: 'Thành công!'
                    })
                }else{
                    return res.status(304).json({
                        status: 'Thành công!',
                        message: 'Không có gì sửa đổi'
                    })
                }
            })
            .catch(err => console.log(err));
    }
}

module.exports = new AuthorController();
