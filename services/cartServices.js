const cartModel = require("../model/cart");
const bookModel = require("../model/admin");

exports.addToCart = (req, callback) => {
  let response = {};
  try {
    return new Promise((resolve, reject) => {
      bookModel.getAvailableBooks({ bookId: req.book_id }).then((data) => {
        if (data.data.quantity > req.quantity) {
          cartModel
            .addToCart(req)
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            })
        }
        else {
          response.success = false;
          response.message = "Quantity is not available";
          reject(response)
        }
      }).catch((err) => {
        reject(err);
      })
    })

  } catch (err) {
    return err;
  }
};
exports.getAllItemsFromCart = (req, callBack) => {

  try {
    return new Promise((resolve, reject) => {
      cartModel
        .getAllItemsFromCart(req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  } catch (err) {
    return callBack(err, null);
  }
};
exports.updateCart = (_id, req) => {
  return new Promise((resolve, reject) => {
    cartModel
      .updateCart(_id, req)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};