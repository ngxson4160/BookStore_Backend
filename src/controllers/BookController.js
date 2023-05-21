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
        let page = 1, pageSize = 3;
        if(req.query.page) page = req.query.page;
        bookDAO.getListBook(Number((page-1)*pageSize), pageSize)
            .then((data) => {
                if(data.length === 0){
                    res.status(404).json({
                        message: 'NOT FOUND',
                        data: null
                    })
                }else{
                    res.json({
                        message: 'Thành công',
                        total: data.length,
                        data: data
                    })
                }
            })
            .catch((err) => console.log(err));
    }
}
module.exports = new BookController();
