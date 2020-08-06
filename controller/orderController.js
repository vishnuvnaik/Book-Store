const orderServices = require("../services/orderServices");

module.exports.addOrder = (req, res) => {
    let response = {};
    try {
        let error = req.validationErrors();
        if (error) {
            response.status = { message: "Problem in ids inputted" };
            response.error = error;
            return res.status(422).send(response);
        } else {
            let filterData = {
                user_id: req.headers.user_id,
                shippingAddress: req.params._id,
            };
            orderServices
                .addOrder(filterData)
                .then((data) => {
                    response.success = true;
                    //  response.data = data;
                    response.message = "Order placed,proceed to checkout";
                    res.status(200).send({ data: response });
                })
                .catch((err) => {
                    console.log(err);
                    response.success = false;
                    response.message = err;
                    res.status(500).send({ data: response });
                });
        }
    } catch (err) {
        if (err.kind === "ObjectId") {
            response.success = false;
            response.message = "Inputted an invalid userID = " + req.params._id;
            res.status(404).send({ data: response });
        } else {
            response.success = false;
            response.message = "userID is not in database";
            res.status(500).send({ data: response });
        }
    }
};