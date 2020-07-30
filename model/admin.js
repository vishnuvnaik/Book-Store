const mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;
var adminSchema = new mongoSchema(
  {
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

bookModel.prototype.addBooks = (req, callback) => {
  let bookAdd = new Books(req);
  bookAdd.save((err, data) => {
    if (err) {
      return callback({ message: "Failed to add book!", error: err });
    } else {
      return callback(null, {
        message: "Book Added Successfully!",
        result: data,
      });
    }
  });
};
bookModel.prototype.getBooks = (field, callback) => {
  try {
    Books.find(field, (err, result) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, result);
      }
    });
  } catch (err) {
    return callback(err);
  }
};
module.exports = new bookModel();
