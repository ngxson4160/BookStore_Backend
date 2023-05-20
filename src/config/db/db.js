const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Son12345",
    database: "Book_Store",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Kết nối Database thành công!");
});

module.exports = connection;
