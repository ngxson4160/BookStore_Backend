const bookDAO = require("../DAO/book");

// async function getbook() {
//     try {
//         const books = await bookDAO.getListBook();
//         return books; // In ra kết quả truy vấn
//     } catch (err) {
//         console.error(err); // Xử lý lỗi
//     }
// }

class BookController {
    //homepage
    getListBook(req, res) {
        let page = 1, pageSize = 10;
        if(req.query.page) page = req.query.page;
        bookDAO.getListBook(Number((page-1)*pageSize), pageSize, req.query.author, req.query.price)
            .then((data) => {
                if(data.length === 0){
                    res.status(404).json({
                        status: 'NOT FOUND',
                        data: null
                    })
                }else{
                    res.json({
                        status: 'Thành công',
                        total: data.length,
                        page: Number(page),
                        pageSize: pageSize,
                        data: data
                    })
                }
            })
            .catch((err) => console.log(err));
    }
}
module.exports = new BookController();
