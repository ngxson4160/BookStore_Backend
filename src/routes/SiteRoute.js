const express = require("express");
const router = express.Router();
const siteController = require("../controllers/SiteController");

//homepage
router.use("/", siteController.homePage);

module.exports = router;
