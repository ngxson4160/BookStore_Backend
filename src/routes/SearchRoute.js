const express = require('express');
const router = express.Router();
const searchController = require('../controllers/SearchController')

//search book: localhost:3000/api/search/books?q=Ánh&page=1&author=6&price=50000,70000
router.use('/books', searchController.searchBook);

module.exports = router;