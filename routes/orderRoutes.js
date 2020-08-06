const express = require("express");
const orderController = require("../controller/orderController");
const router = express.Router();
const authenticate = require("../middleware/autheticateuser");

// user routes
// router.get("/books", authenticate.checkTokenAuth, orderController.addToCart);
router.post(
    "/addOrder/:_id",
    authenticate.checkTokenAuth,
    orderController.addOrder
);


module.exports = router;
