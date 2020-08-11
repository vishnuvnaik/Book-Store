const Service = require("../services/orderServices");
const orderServices = new Service();
const constantsParam = require("../constants/static");
const logger = require("../config/logger");

module.exports.addOrder = (req, res) => {
  let response = {};
  try {
    let error = req.validationErrors();
    if (error) {
      response.error = error;

      return res
        .status(
          constantsParam.staticHTTPErrorMessages.UNPROCESSABLE_ENTITY
            .errorResponseMessage
        )
        .send({ data: response });
    } else {
      let filterData = {
        user_id: req.decoded.payload.id,
        shippingAddress: req.params._id,
        product_id: req.headers.product_id,
      };
      orderServices
        .addOrder(filterData)
        .then((data) => {
          response.success = true;
          //  response.data = data;
          response.message = "Order placed";
          return res
            .status(
              constantsParam.staticHTTPSuccessMessages.OK.successResponseCode
            )
            .send({ data: response });
        })
        .catch((err) => {
          console.log(err);
          response.success = false;
          response.message = err;
          res.status(500).send({ data: response });
        });
    }
  } catch (err) {
    // logger.error(err);
    // if (err instanceof TypeError ||
    //     err instanceof ReferenceError ||
    //     err instanceof SyntaxError ||
    //     err instanceof AssertionError ||
    //     err instanceof RangeError ||
    //     err instanceof EvalError ) {
    //     logger.error("programming error:", err);
    // }
    // else {
    //     logger.warn('user defined error:', err);
    // }
    if (err.kind === "ObjectId") {
      response.success = false;
      response.message = "Inputted an invalid shippingID = " + req.params._id;
      res.status(404).send({ data: response });
    } else {
      response.success = false;
      response.message = "cart is empty for this user";
      res.status(500).send({ data: response });
    }
  }
};
