const express = require("express");
const customerController = require("../controller/customerController");
const router = express.Router();
const authenticate = require("../middleware/autheticateuser");

router.post(
    "/customerDetails/:_id",
    authenticate.checkTokenAuth,
    customerController.addAddress
);
module.exports = router;