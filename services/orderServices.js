const orderModel = require("../model/order");
const cartModel = require("../model/cart")
const bookModel = require("../model/admin");
const orderDetails = require("../model/orderDetails")

module.exports = class OrderServices {
    addOrder(req) {
        try {
            return new Promise((resolve, reject) => {
                cartModel.getAllItemsFromCart(req.user_id)
                    .then((data) => {
                        let sum = 0;
                        if (data.length <= 0) {
                            reject("Cart is empty for this user")
                        }
                        else if (data.length > 0) {

                            this.addOrderDetails(req)
                                .then((data) => {
                                    resolve(data);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        }
                        else if (data == null) {
                            reject("user id not found,try again")
                        }
                    })
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
                            cartModel.getItemsByUserProduct(req)
                                .then((data) => {
                                    var quantity = data.data[0].quantity;
                                    if (data.length <= 0) {
                                        resolve({ message: "cart is empty", data: data });
                                    }
                                    else if (data !== null) {
                                        bookModel.getAvailableBooks(req).then((data) => {
                                            console.log(data.price)
                                            if (data !== null) {
                                                let totalAmount = quantity * data.price;
                                                let filterData = {
                                                    order_id: order_id,
                                                    product_id: req.product_id,
                                                    totalAmount: totalAmount
                                                };
                                                orderDetails.placeOrder(filterData)
                                                    .then((data) => {
                                                        resolve(data);
                                                    })
                                                    .catch((err) => {
                                                        reject(err);
                                                    });
                                            }
                                            else {
                                                reject({ message: "error in placing order,retry" })
                                            }
                                        })
                                    }
                                    else {
                                        reject({ message: "cart is empty" })
                                    }
                                }).catch((err) => {
                                    reject(err);
                                })
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
