const express = require("express");
const cartController = require("../controller/cartController");
const router = express.Router();
const authenticate = require("../middleware/autheticate");

// user routes
// router.get("/books", authenticate.checkTokenAuth, cartController.addToCart);
router.post(
  "/addtocart/:_id",
  authenticate.checkTokenAuth,
  cartController.addToCart
);
router.get(
  "/getCart/:_id",
  authenticate.checkTokenAuth,
  cartController.getAllItemsFromCart
);

module.exports = router;
