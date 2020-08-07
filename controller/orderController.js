const Service = require("../services/orderServices");
const orderServices = new Service()


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
                user_id: req.decoded.payload.id,
                shippingAddress: req.params._id,
                product_id: req.headers.product_id,
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
            response.message = "cart is empty for this user";
            res.status(500).send({ data: response });
        }
    }
};