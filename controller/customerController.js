const customerServices = require("../services/customerServices");
module.exports.addAddress = (req, res) => {
    let response = {};
    try {
        req.checkBody("name", "name should not be empty").notEmpty();
        req.checkBody("city", "city should not be empty").notEmpty();
        req.checkBody("landmark", "landmark should not be empty").notEmpty();
        req.checkBody("pincode", "pincode should not be empty").notEmpty().isNumeric().isLength({ min: 6, max: 6 });
        req.checkBody("phoneNumber", "phoneNumber should not be empty").notEmpty().isLength({ min: 10, max: 10 });
        req.checkBody("state", "state should not be empty").notEmpty();
        req.checkBody("address", "address should not be empty").notEmpty();
        req.checkBody("addressType", "address type should not be empty").notEmpty().isAlpha();
        let error = req.validationErrors();
        if (error) {
            response.success = false;
            response.message = { error };

            return res.status(422).send(response);
        } else {
            let filterData = {
                user_id: req.params._id,
                name: req.body.name,
                city: req.body.city,
                pincode: req.body.pincode,
                phoneNumber: req.body.phoneNumber,
                state: req.body.state,
                landmark: req.body.landmark,
                address: req.body.address,
                addressType: req.body.addressType
            };
            customerServices
                .addAddress(filterData)
                .then((data) => {
                    response.success = true;
                    response.data = data;
                    response.message = "Address added  Successfully";
                    res.status(200).send({ data: response });
                })
                .catch((err) => {
                    response.success = false;
                    response.message = err;
                    res.status(500).send({ data: response });
                });
        }
    }
    catch (err) {
        response.status = false;
        response.error = err;
        return res.status(500).send(response);
    }

};