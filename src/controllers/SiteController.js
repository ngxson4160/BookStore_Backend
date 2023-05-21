const productDAO = require("../DAO/product");

// async function getProduct() {
//     try {
//         const products = await productDAO.getListBook();
//         return products; // In ra kết quả truy vấn
//     } catch (err) {
//         console.error(err); // Xử lý lỗi
//     }
// }

class SiteController {
    //homepage
    homePage(req, res) {

        productDAO.getListBook()
            .then((data) => {
                res.json(data);
            })
            .catch((err) => console.log(err));
    }
}
module.exports = new SiteController();
