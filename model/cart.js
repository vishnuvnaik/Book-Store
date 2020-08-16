const mongoose = require("mongoose");

var mongoSchema = mongoose.Schema;
var cartSchema = new mongoSchema(
  {
    user_id: {
      type: mongoSchema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    product_id: {
      type: mongoSchema.Types.ObjectId,
      required: true,
      ref: "Books",
    },
    quantity: { type: Number, required: [true, "quantity is required"] },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);
var cartsModel = mongoose.model("Cart", cartSchema);
function cartModel() {}
cartModel.prototype.addToCart = (req) => {
  let cartAdd = new cartsModel(req);
  return cartAdd.save();
};
cartModel.prototype.getAllItemsFromCart = (field) => {
  return cartsModel.find(field).populate("product_id", "title price quantity");
};

cartModel.prototype.getItemsByUserProduct = (field) => {
  return cartsModel
    .find({ user_id: field.user_id })
    .populate("product_id", "price quantity");
};

cartModel.prototype.updateCart = (_id, req) => {
  return Cart.findByIdAndUpdate(_id, req, { useFindAndModify: false });
};
cartModel.prototype.removeFromCart = (_id) => {
  return Cart.findByIdAndRemove(_id, { useFindAndModify: false });
};
module.exports = new cartModel();
