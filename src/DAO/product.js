const connection = require("../config/db/db");

class ProductDAO {
    getAllProduct() {
        let sql = "SELECT * FROM Book_Store.product";
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getProductByQuery(q, page, pageSize) {
        let sql  = `SELECT pd.id, pd.description, au.name AS author, pd.importPrice, pd.originalPrice, pd.salePrice, pd.publisher, pd.quantity, pd.size
                    FROM product pd
                    JOIN author au on au.id = pd.authorID
                    WHERE 
                        au.name like '%${q}%'
                        or pd.description like '%${q}%'    
                    LIMIT ${page}, ${pageSize}`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, rows, fields) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = new ProductDAO();
