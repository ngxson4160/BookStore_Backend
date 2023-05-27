const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.post('/logout', userController.logOut);

module.exports = router;