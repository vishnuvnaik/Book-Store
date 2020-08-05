const cartModel = require("../model/cart");
const bookModel = require("../model/admin");

module.exports.addToCart = (req) => {
  let productId = { product_id: req.product_id }
  try {
    return new Promise((resolve, reject) => {
      bookModel.getAvailableBooks(productId)
        .then((data) => {
          if (data == null) {
            reject("Book is not available")
          }
          else if (data.quantity > req.quantity) {
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
module.exports.getAllItemsFromCart = (req) => {

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
    return err
  }
};
module.exports.updateCart = (_id, req) => {
  let productId = {
    product_id: req.product_id
  }
  try {
    return new Promise((resolve, reject) => {
      bookModel.getAvailableBooks(productId).then((data) => {
        if (data.quantity > req.quantity) {
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
    return err;
  }

}
module.exports.removeFromCart = (_id) => {
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
