const express = require("express");
const cartController = require("../controller/cartController");
const router = express.Router();
const authenticate = require("../middleware/autheticateuser");

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
router.put(
  "/cart/:_id",
  authenticate.checkTokenAuth,
  cartController.updateCart
);
router.delete(
  "/cart/:_id",
  authenticate.checkTokenAuth,
  cartController.removeFromCart
);

module.exports = router;
