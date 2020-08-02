const cartServices = require("../services/cartServices");
module.exports.addToCart = (req, res) => {
  let response = {};
  try {
    req.checkBody("quantity", "Quantity should not be empty").notEmpty();
    let error = req.validationErrors();
    if (error) {
      response.status = { message: "Invalid Input" };
      response.error = error;
      return res.status(422).send(response);
    } else {
      let filterData = {
        user_id: req.headers.user_id,
        book_id: req.params._id,
        quantity: req.body.quantity,
      };
      cartServices
        .addToCart(filterData)
        .then((data) => {
          response.success = true;
          response.data = data;
          response.message = "Book added to cart";
          res.status(200).send({ data: response });
        })
        .catch((err) => {
          console.log(err);
          response.success = false;
          response.message = err;
          res.status(500).send({ data: response });
        });
    }
  } catch (err) {
    response.status = false;
    response.error = err;
    return res.status(500).send(response);
  }
};
module.exports.getAllItemsFromCart = (req, res) => {
  let response = {};
  var id = {
    userId: req.decoded.payload.email,
  };
  try {
    cartServices
      .getAllItemsFromCart(id.userId)
      .then((data) => {
        response.success = true;
        response.data = data;
        response.message = "Book details retrieved";
        res.status(200).send({ data: response });
      })
      .catch((err) => {
        console.log(err);
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      });
  } catch (err) {
    response.success = false;
    response.error = err;
    return res.status(500).send(response);
  }
};
