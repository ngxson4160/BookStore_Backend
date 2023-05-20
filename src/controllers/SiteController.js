const productDAO = require("../DAO/product");

// async function getProduct() {
//     try {
//         const products = await productDAO.getAllProduct();
//         return products; // In ra kết quả truy vấn
//     } catch (err) {
//         console.error(err); // Xử lý lỗi
//     }
// }

class SiteController {
    //homepage
    homePage(req, res) {
        // res.json(await getProduct());

        productDAO.getAllProduct()
            .then((data) => {
                res.json(data);
            })
            .catch((err) => console.log(err));
    }
}
module.exports = new SiteController();
