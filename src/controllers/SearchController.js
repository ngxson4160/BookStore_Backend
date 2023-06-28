const productDAO = require("../DAO/book");
class SearchController {
    searchBook(req, res) {
        let q = '';
        let page = 1, pageSize = 10;
        if(req.query.q) q = req.query.q;
        if(req.query.page) page = req.query.page;
        if (q.length === 0) {
            res.status(404).json({
                status: "NOT FOUND",
                data: null,
            });
        } else {
            productDAO.getBookBySearch(q, Number((page-1)*pageSize), pageSize, req.query.author, req.query.price, req.query.rating)
                .then((data) => {
                    if(data.length === 0) {
                        res.status(404).json({
                            status: "NOT FOUND",
                            data: null,
                        });
                    }else{
                        data.forEach((value, index) => {
                            if (typeof value.image === "string") {
                                data[index].image = JSON.parse(value.image);
                            }
                        });
                        res.status(200).json({
                            status: "Thành công",
                            total: data.length,
                            data: data,
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
    }
}

module.exports = new SearchController();
