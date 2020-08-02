const cartModel = require("../model/cart");
const cart = require("../model/cart");

exports.addToCart = (req) => {
  try {
    return new Promise((resolve, reject) => {
      cartModel
        .addToCart(req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
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
