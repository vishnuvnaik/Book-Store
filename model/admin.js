const mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;
const Schema = mongoose.Schema;
var adminSchema = new mongoSchema(
  {
    user_id: {
      type: String,
      required: [true, "User_id required"],
    },
    bookName: { type: String, required: [true, "bookname is required"] },
    authorName: { type: String, required: [true, "authorname is required"] },
    title: { type: String, required: [true, "title is required"] },
    description: { type: String, required: [true, "description is required"] },
    quantity: { type: String, required: [true, "quantity is required"] },
    price: { type: String, required: [true, "price is required"] },
  },
  {
    timestamps: true,
  }
);
var Books = mongoose.model("Books", adminSchema);

function bookModel() {}

bookModel.prototype.addBooks = (req) => {
  try {
    return new Promise((resolve, reject) => {
      let bookAdd = new Books(req);
      bookAdd
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
bookModel.prototype.getBooks = (field, callback) => {
  try {
    return new Promise((resolve, reject) => {
      Books.find({ user_id: field })
        .then((result) => {
          resolve({ data: result });
        })
        .catch((err) => {
          reject({ error: err });
        });
    });
    // console.log(field);

    // Books.find({ user_id: field }, (err, result) => {
    //   if (err) {
    //     return callback(err);
    //   } else {
    //     return callback(null, result);
    //   }
    // });
  } catch (err) {
    return callback(err);
  }
};
module.exports = new bookModel();
