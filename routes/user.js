const express = require("express");
const userController = require("../controller/userController");
const token = require("../middleware/token");
const router = express.Router();
// user routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword/", token.verify, userController.resetPassword);
module.exports = router;
