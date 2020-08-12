const express = require("express");
const orderController = require("../controller/orderController");
const orderDetailsController = require("../controller/orderDetailsController");
const router = express.Router();
const authenticate = require("../middleware/autheticateuser");

router.post(
  "/placeorder",
  authenticate.checkTokenAuth,
  orderController.addOrder
);

module.exports = router;
