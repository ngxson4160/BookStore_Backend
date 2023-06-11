const path = require("path");
const express = require("express");
const cors = require("cors");

const routes = require("./src/routes/routes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "src/public")));

app.get('/test', (req, res) => {
    // console.log(req.query.a);
    res.json('Test Page');
})

routes(app);

app.listen(3000);
