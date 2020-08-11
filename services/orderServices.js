const orderModel = require("../model/order");
const cartModel = require("../model/cart");
const bookModel = require("../model/admin");
const orderDetails = require("../model/orderDetails");

module.exports = class OrderServices {
  addOrder(req) {
    try {
      return new Promise((resolve, reject) => {
        cartModel.getAllItemsFromCart(req.user_id).then((data) => {
          if (data.length <= 0) {
            reject("Cart is empty for this user");
          } else if (data.length > 0) {
            this.addOrderDetails(req)
              .then((data) => {
                resolve(data);
              })
              .catch((err) => {
                reject(err);
              });
          } else if (data == null) {
            reject("user id not found,try again");
          }
        });
      });
    } catch (err) {
      return err;
    }
  }
  addOrderDetails(req) {
    try {
      return new Promise((resolve, reject) => {
        orderModel
          .addOrder(req)
          .then((data) => {
            const order_id = data._id;
            {
              cartModel
                .getItemsByUserProduct(req)
                .then((data) => {
                  let sum = 0;
                  let cartdetails = data.filter((data) => {
                    if (data.isActive === true) {
                      sum = sum + data.quantity * data.product_id.price;
                      return data;
                    } else {
                      reject({
                        message: "No active products in cart are avaliable",
                      });
                    }
                  });

                  if (data.length <= 0) {
                    resolve({ message: "cart is empty", data: data });
                  } else if (data !== null) {
                    bookModel.getAvailableBooks(req).then((data) => {
                      if (data !== null) {
                        let totalAmount = sum;
                        cartdetails.forEach((cartdetails) => {
                          let filterData = {
                            order_id: order_id,
                            product_id: cartdetails.product_id._id,
                            totalAmount: totalAmount,
                            quantity: cartdetails.quantity,
                          };
                          orderDetails
                            .placeOrder(filterData)
                            .then((data) => {
                              resolve(data);
                              let req = { isActive: false };
                              let req1 = cartdetails.product_id.quantity;
                              let req2 = cartdetails.quantity;
                              let req3 = req1 - req2;
                              let quantityBody = { quantity: req3 };
                              cartModel
                                .updateCart(cartdetails.id, req)
                                .then((data) => {
                                  resolve(data);
                                })
                                .catch((err) => {
                                  reject(err);
                                });
                              bookModel
                                .updateBook(
                                  cartdetails.product_id._id,
                                  quantityBody
                                )
                                .then((data) => {
                                  resolve(data);
                                })
                                .catch((err) => {
                                  reject(err);
                                });
                            })
                            .catch((err) => {
                              reject(err);
                            });
                        });
                      } else {
                        reject({ message: "error in placing order,retry" });
                      }
                    });
                  } else {
                    reject({ message: "cart is empty" });
                  }
                })
                .catch((err) => {
                  reject(err);
                });
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      return err;
    }
  }
};
