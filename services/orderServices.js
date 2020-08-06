const orderModel = require("../model/order");

module.exports.addOrder = (req) => {
    try {
        return new Promise((resolve, reject) => {
            orderModel
                .addOrder(req)
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