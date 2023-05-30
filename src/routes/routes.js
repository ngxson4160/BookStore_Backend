// const express = require("express");
const bookRoute = require("./BookRoute");
const searchRoute = require("./SearchRoute");
const authorRoute = require("./AuthorRoute");
const userRoute = require("./UserRoute");
const cartRoute = require("./CartRoute");
const { loginMiddleware } = require("../middlewares/AuthenMiddleware");
var test = require("../controllers/TestController");
function routes(app) {
    app.use("/api/search", searchRoute);

    app.use("/api/books", bookRoute);

    app.use("/api/authors", authorRoute);

    app.use("/api/users", userRoute);

    app.use("/api/carts", cartRoute);
}

module.exports = routes;
