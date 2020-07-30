const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();
const authenticate = require("../middleware/autheticate");

// user routes
router.get("/books", authenticate.checkTokenAuth, adminController.getBooks);
router.post("/books",authenticate.checkTokenAuth, adminController.addBookController);
//router.put("/books", adminController.updateBooks);
//router.delete("/books/", token.verify, adminController.deleteBooks);
module.exports = router;
