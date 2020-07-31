const express = require("express");
const adminController = require("../controller/adminController");
const router = express.Router();
const authenticate = require("../middleware/autheticate");

// user routes
router.get("/books", authenticate.checkTokenAuth, adminController.getBooks);
router.post(
  "/books",
  authenticate.checkTokenAuth,
  adminController.addBookController
);
router.put("/books/:_id", adminController.updateBooks);
// router.delete(
//   "/books/:_id",
//   authenticate.checkTokenAuth,
//   adminController.deleteBooks
// );
module.exports = router;
