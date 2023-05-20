// const express = require("express");
const siteRoute = require("./SiteRoute");
const searchRoute = require("./SearchRoute");

function routes(app) {
    app.use("/search", searchRoute);
    app.use("/", siteRoute);
}

module.exports = routes;
