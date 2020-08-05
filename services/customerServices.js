const addressModel = require("../model/customer");

module.exports.addAddress = (req) => {
    try {
        return new Promise((resolve, reject) => {
            addressModel
                .addDetails(req)
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