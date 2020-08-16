const mongoose = require("mongoose");

var mongoSchema = mongoose.Schema;
var orderDetailsSchema = new mongoSchema(
  {
    order_id: {
      type: mongoSchema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    product_id: {
      type: mongoSchema.Types.ObjectId,
      required: true,
      ref: "users",
    },

    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
var orderDetails = mongoose.model("OrderDetails", orderDetailsSchema);
function orderModel() {}
orderModel.prototype.placeOrder = (req) => {
  let orderPlace = new orderDetails(req);
  return orderPlace.save();
};
module.exports = new orderModel();
