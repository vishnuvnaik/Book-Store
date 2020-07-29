const express = require("express");
const userController = require("../controller/controller");
const token = require("../middleware/token");
const router = express.Router();
// user routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/update", userController.update);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword", token.verify, userController.resetPassword);
module.exports = router;
