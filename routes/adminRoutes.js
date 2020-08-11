const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();
const authenticate = require("../middleware/autheticate");

// user routes
router.get("/books", adminController.getBooks);
router.post(
  "/books",
  authenticate.checkTokenAuth,
  adminController.addBookController
);
router.put(
  "/books/:_id",
  authenticate.checkTokenAuth,
  adminController.updateBooks
);
router.delete(
  "/books/:_id",
  authenticate.checkTokenAuth,
  adminController.deleteBook
);
router.post("/search", adminController.searchingBooks);
module.exports = router;
