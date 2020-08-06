const orderModel = require("../model/order");
const cartModel = require("../model/cart")
module.exports.addOrder = (req) => {
    try {
        return new Promise((resolve, reject) => {
            cartModel.getAllItemsFromCart(req.user_id)
                .then((data) => {
                    if (data.length <= 0) {
                        reject("Cart is empty for this user id ")
                    }
                    else if (data.length > 0) {
                        orderModel
                            .addOrder(req)
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
};
