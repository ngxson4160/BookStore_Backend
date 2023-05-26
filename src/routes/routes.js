// const express = require("express");
const bookRoute = require("./BookRoute");
const searchRoute = require("./SearchRoute");
const authorRoute = require("./AuthorRoute");
const userRoute = require("./UserRoute");

function routes(app) {
    app.use("/api/search", searchRoute);
    app.use("/api/books", bookRoute);
    app.use("/api/authors", authorRoute);
    app.use("/api/users", userRoute);
}

module.exports = routes;
