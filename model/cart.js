const mongoose = require("mongoose");

var mongoSchema = mongoose.Schema;
var cartSchema = new mongoSchema(
  {
    user_id: {
      type: mongoSchema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    book_id: {
      type: mongoSchema.Types.ObjectId,
      required: true,
      ref: "books",
    },
    quantity: { type: Number, required: [true, "quantity is required"] },
    isOrdered: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
var Cart = mongoose.model("Cart", cartSchema);
function cartModel() { }
cartModel.prototype.addToCart = (req) => {
  try {
    return new Promise((resolve, reject) => {
      let cartAdd = new Cart(req);
      cartAdd
        .save()
        .then((result) => {
          resolve({ data: result });
        })
        .catch((err) => {
          reject({ error: err });
        });
    });
  } catch (err) {
    console.log(err);
  }
};
cartModel.prototype.getAllItemsFromCart = (field) => {
  return Cart.find({ user_id: field })
};

cartModel.prototype.updateCart = (_id, req) => {
  return Cart.findByIdAndUpdate(_id, req, { useFindAndModify: false })
};
cartModel.prototype.removeFromCart = (_id) => {

  return Cart.findByIdAndRemove(_id, { useFindAndModify: false })

};
module.exports = new cartModel();
