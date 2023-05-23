const express = require('express');
const router = express.Router();
const authorController = require('../controllers/AuthorController')

router.get('/', authorController.getListAuthor)
router.post('/', authorController.addAuthor)
module.exports = router