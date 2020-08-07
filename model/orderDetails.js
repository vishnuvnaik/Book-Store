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
        totalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
var OrderDetails = mongoose.model("OrderDetails", orderDetailsSchema);
function orderModel() { }
orderModel.prototype.placeOrder = (req) => {
    let orderPlace = new OrderDetails(req);
    return orderPlace.save()
}
module.exports = new orderModel();