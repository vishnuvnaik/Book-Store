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
  try {
    return new Promise((resolve, reject) => {
      Cart.find({ user_id: field })
        .then((data) => {
          if (data.length == 0) {
            resolve({ message: "Book Not found", data: data });
          } else {
            resolve({ message: "Books found", data: data });
          }
        })
        .catch((err) => {
          reject({ error: err });
        });
    });
  } catch (err) {
    return callback(err);
  }
};

cartModel.prototype.updateCart = (_id, req) => {
  return new Promise((resolve, reject) => {
    Cart.findByIdAndUpdate(_id, req, { useFindAndModify: false })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = new cartModel();
