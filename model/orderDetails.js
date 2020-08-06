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
var OrderDetails = mongoose.model("Order", orderDetailsSchema);
function orderModel() { }
orderModel.prototype.addToCart = (req) => {
    let orderAdd = new OrderDetails(req);
    return orderAdd.save()
}
module.exports = new orderModel();