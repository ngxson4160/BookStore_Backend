const express = require("express");
const userController = require("../controllers/UserController");
const { checkUserExist, loginMiddleware } = require("../middlewares/AuthenMiddleware");
const upload = require("../ultils/UploadsFile");

const router = express.Router();

//SignUp: localhost:3000/api/users/signup/
router.post("/signup", checkUserExist, userController.signUp);

//SignIn: localhost:3000/api/users/signin
router.post("/signin", checkUserExist, userController.signIn);

//Logout: localhost:3000/api/users/logout
router.post("/logout", userController.logOut);

//Change Password: localhost:3000/api/users/change-password
router.put("/change-password", loginMiddleware, userController.changePassword);

//Update user: localhost:3000/api/users/update
router.put("/update", loginMiddleware, upload.single("avatar"), userController.updateUser);

module.exports = router;
