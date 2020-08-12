const orderModel = require("../model/order");
const cartModel = require("../model/cart");
const bookModel = require("../model/admin");
const orderDetails = require("../model/orderDetails");
const customerService = require("../services/customerServices.js");
module.exports = class OrderServices {
  addOrder(req) {
    try {
      return new Promise((resolve, reject) => {
        cartModel
          .getAllItemsFromCart({ user_id: req.user_id })
          .then((data1) => {
            let customerdetail = {
              user_id: req.user_id,
            };
            let sum = 0;
            if (data1.length > 0) {
              let cartdetails = data1.filter((data1) => {
                if (data1.isActive === true) {
                  sum = sum + data1.quantity * data1.product_id.price;
                  return data1;
                }
                return null;
              });
              if (cartdetails.length != 0) {
                this.addOrderDetails(customerdetail, cartdetails, sum, req)
                  .then((data) => {
                    resolve(data);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else {
                reject({ message: "No Product in cart" });
              }
            } else {
              reject({ message: "No Product in cart" });
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
  addOrderDetails(customerdetail, cartdetails, sum, req) {
    try {
      return new Promise((resolve, reject) => {
        customerService
          .getCustomerById(customerdetail)
          .then((data) => {
            let filterData = {
              user_id: req.user_id,
              totalAmount: sum,
              shippingAddress: data._id,
            };
            orderModel
              .addOrder(filterData)
              .then((data1) => {
                cartdetails.forEach((cartdetails) => {
                  let detail = {
                    order_id: data1._id,
                    product_id: cartdetails.product_id._id,
                    quantity: cartdetails.quantity,
                  };
                  orderDetails
                    .placeOrder(detail)
                    .then((data) => {
                      let isactive = {
                        $set: { isActive: false },
                      };
                      let quantityStock =
                        cartdetails.product_id.quantity - cartdetails.quantity;
                      let updatequantity = {
                        quantity: quantityStock,
                      };
                      cartModel
                        .updateCart(cartdetails._id, isactive)
                        .then((data) => {
                          bookModel
                            .updateBook(
                              cartdetails.product_id._id,
                              updatequantity
                            )
                            .then((data) => {
                              resolve(data1);
                            })
                            .catch((err) => {
                              reject(err);
                            });
                        })
                        .catch((err) => {
                          reject(err);
                        });
                    })
                    .catch((err) => {
                      reject(err);
                    });
                });
              })
              .catch((err) => {
                reject(err);
              });
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
