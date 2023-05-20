const productDAO = require("../DAO/product");
class SearchController {
    query(req, res) {
        let q = req.query.q;
        let page = 1;
        if(req.query.page) page = req.query.page;
        if (q.length === 0) {
            res.status(404).json({
                message: "NOT FOUND",
                data: null,
            });
        } else {
            productDAO.getProductByQuery(q, Number((page-1)*3), 10)
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
