const express = require('express');
const router = express.Router();
const searchController = require('../controllers/SearchController')

router.use('/', searchController.query);

module.exports = router;