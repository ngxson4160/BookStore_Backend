// const express = require("express");
const bookRoute = require("./BookRoute");
const searchRoute = require("./SearchRoute");

function routes(app) {
    app.use("/api/search", searchRoute);
    app.use("/api/books", bookRoute);
}

module.exports = routes;
