const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();
// user routes
router.get("/books", adminController.getBooks);
router.post("/books", adminController.addBookController);
//router.put("/books", adminController.updateBooks);
//router.delete("/books/", token.verify, adminController.deleteBooks);
module.exports = router;
