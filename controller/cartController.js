const cartServices = require("../services/cartServices");
module.exports.addToCart = (req, res) => {
  let response = {};
  try {
    req.checkBody("quantity", "Quantity should not be empty").notEmpty();
    let error = req.validationErrors();
    if (error) {
      response.status = { message: "Quantity should be positive integer" };
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
          //  response.data = data;
          response.message = "Quantity is available,Book added to cart";
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
    userId: req.params._id,
  };

  cartServices
    .getAllItemsFromCart(id.userId)
    .then((data) => {
      response.success = true;
      response.data = data;
      res.status(200).send({ data: response });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        response.success = false;
        response.message = "Inputted an invalid userID = " + req.params._id;
        res.status(404).send({ data: response });
      } else {
        response.success = false;
        response.message = "userID is not in database";
        res.status(500).send({ data: response });
      }
    });

};
module.exports.updateCart = (req, res) => {
  let response = {};
  try {

    req.checkBody("quantity", "quantity is invalid").isNumeric();
    let errors = req.validationErrors();
    if (errors) {
      response.success = false;
      let data = { message: "Quantity should be positive integer only " };
      response.data = data;
      res.status(422).send(response);
    } else {
      cartServices
        .updateCart(req.params._id, req.body)
        .then((data) => {
          response.success = true;
          response.data = data;
          response.message = "Cart Updated Successfully";
          res.status(200).send({ data: response });
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            response.success = false;
            response.message = "Inputted an invalid CartID = " + req.params._id;
            res.status(404).send({ data: response });
          } else {
            response.success = false;
            response.message = err;
            res.status(500).send({ data: response });
          }
        });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.removeFromCart = (req, res) => {
  var response = {};
  cartServices
    .removeFromCart(req.params._id)
    .then((data) => {
      if (!data) {
        response.success = false;
        response.message = "Cart not found with id " + req.params._id;
        res.status(404).send({ data: response });
      } else {
        response.success = true;
        response.data = data;
        console.log(response);
        response.message = "Removed item from cart successfully";
        res.status(200).send({ data: response });
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        response.success = false;
        response.message = "Inputted an invalid cartID = " + req.params._id;
        res.status(404).send({ data: response });
      } else {
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      }
    });
};