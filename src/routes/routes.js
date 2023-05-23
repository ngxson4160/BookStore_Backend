// const express = require("express");
const bookRoute = require("./BookRoute");
const searchRoute = require("./SearchRoute");
const authorRoute = require("./AuthorRoute");

function routes(app) {
    app.use("/api/search", searchRoute);
    app.use("/api/books", bookRoute);
    app.use("/api/authors", authorRoute);
}

module.exports = routes;
