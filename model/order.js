const mongoose = require("mongoose");

var mongoSchema = mongoose.Schema;
var orderSchema = new mongoSchema(
  {
    user_id: {
      type: mongoSchema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    shippingAddress: {
      type: mongoSchema.Types.ObjectId,
      required: true,
      ref: "customer",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
var Order = mongoose.model("Order", orderSchema);
function orderModel() {}
orderModel.prototype.addOrder = (req) => {
  let orderAdd = new Order(req);
  return orderAdd.save();
};
module.exports = new orderModel();
