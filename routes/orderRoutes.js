const express = require("express");
const orderController = require("../controller/orderController");
const orderDetailsController = require("../controller/orderDetailsController")
const router = express.Router();
const authenticate = require("../middleware/autheticateuser");

// user routes
// router.get("/books", authenticate.checkTokenAuth, orderController.addToCart);
router.post(
    "/addOrder/:_id",
    authenticate.checkTokenAuth,
    orderController.addOrder
);
// router.post(
//     "/placeOrder/:_id",
//     authenticate.checkTokenAuth,
//     orderDetailsController.placeOrder
// );


module.exports = router;
