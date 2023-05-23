const productDAO = require("../DAO/book");
class SearchController {
    searchBook(req, res) {
        let q = '';
        let page = 1, pageSize = 10;
        if(req.query.q) q = req.query.q;
        if(req.query.page) page = req.query.page;
        if (q.length === 0) {
            res.status(404).json({
                message: "NOT FOUND",
                data: null,
            });
        } else {
            productDAO.getBookBySearch(q, Number((page-1)*pageSize), pageSize, req.query.author, req.query.price, req.query.rating)
                .then((value) => {
                    if(value.length === 0) {
                        res.status(404).json({
                            message: "NOT FOUND",
                            data: null,
                        });
                    }else{
                        res.status(200).json({
                            message: "Thành công",
                            total: value.length,
                            data: value,
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    }
}

module.exports = new SearchController();
