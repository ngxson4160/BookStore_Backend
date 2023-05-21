const express = require('express');
const router = express.Router();
const searchController = require('../controllers/SearchController')

router.use('/books', searchController.searchBook);

module.exports = router;