const mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;
//schema for registration of new user
var customerDetails = new mongoSchema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be left blank"],
    },
    pincode: {
      type: Number,
      required: [true, "Quantity cannot be left blank"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Quantity cannot be left blank"],
    },
    city: {
      type: String,
      required: [true, "City cannot be left blank"],
    },
    landmark: {
      type: String,
      required: [true, "Landmark cannot be left blank"],
    },
    state: {
      type: String,
      required: [true, "state cannot be left blank"],
    },
    address: {
      type: String,
      required: [true, "Address cannot be left blank"],
    },
    addressType: {
      type: String,
      enum: ["home", "other"],
      default: "home",
      required: [true, "Address_type cannot be left blank"],
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "carts",
    },
  },
  {
    timestamps: true,
  }
);

var customer = mongoose.model("customer", customerDetails);
function customerDetailsModel() {}
customerDetailsModel.prototype.addDetails = (req) => {
  let cartAdd = new customer(req);
  return cartAdd.save();
};

customerDetailsModel.prototype.findDetails = (req) => {
  return customerDetails.find(req).populate("addressType");
};
customerDetailsModel.prototype.find = (req) => {
  return customer.findOne(req);
};

module.exports = new customerDetailsModel();
