const path = require("path");
const express = require("express");
const app = express();
// const con = require('./src/config/db/db')
const routes = require("./src/routes/routes");

app.use(express.static(path.join(__dirname, "src/public")));

app.get('/test', (req, res) => {
    // console.log(req.query.a);
    res.json('Test Page');
})
routes(app);

app.listen(3000);
