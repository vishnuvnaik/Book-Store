const cartModel = require("../model/cart");
const bookModel = require("../model/admin");

exports.addToCart = (req, callback) => {
  try {
    return new Promise((resolve, reject) => {
      bookModel.getAvailableBooks({ bookId: req.book_id })
        .then((data) => {
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
            reject("Quantity is not available")
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
          if (data.length == 0) {
            resolve({ message: "No books are found in this user id" });
          }
          else {
            resolve(data);
          }
        })
        .catch((err) => reject(err));
    });
  } catch (err) {
    return callBack(err, null);
  }
};
exports.updateCart = (_id, req) => {
  let response = {};
  try {
    return new Promise((resolve, reject) => {
      bookModel.getAvailableBooks({ bookId: req.book_id }).then((data) => {
        if (data.data.quantity > req.quantity) {
          cartModel
            .updateCart(_id, req)
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject("Quantity is not available")
        }
      })
    })
  } catch (err) {
    return callBack(err, null);
  }

}
exports.removeFromCart = (_id) => {
  return new Promise((resolve, reject) => {
    cartModel
      .removeFromCart(_id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
