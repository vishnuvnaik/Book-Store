const mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;
var adminSchema = new mongoSchema(
  {
    bookName: {
      type: String,
      required: [true, "bookname is required"],
      validate: /^[A-Za-z]+$/,
    },
    authorName: {
      type: String,
      required: [true, "authorname is required"],
      validate: /^[A-Za-z]+$/,
    },
    genre: {
      type: String,
      required: [true, "genre is required"],
      validate: /^[A-Za-z]+$/,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      validate: /^[a-zA-Z ]*$/,
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
      validate: /^[0-9]*$/,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      validate: /^[0-9]*$/,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
var booksModel = mongoose.model("Books", adminSchema);

function bookModel() {}

bookModel.prototype.addBooks = (req) => {
  let bookAdd = new booksModel(req);
  return bookAdd.save();
};
bookModel.prototype.getBooks = (field) => {
  return booksModel.find(field.find);
};

bookModel.prototype.getAvailableBooks = (field) => {
  return booksModel.findById(field.product_id);
};
bookModel.prototype.searchingBooks = async (findingQuery) => {
  return booksModel.find(findingQuery.findingQuery);
};

bookModel.prototype.updateBook = (_id, req) => {
  return booksModel.findByIdAndUpdate(_id, req, { useFindAndModify: false });
};

bookModel.prototype.deleteBook = (_id) => {
  return booksModel.findByIdAndRemove(_id, { useFindAndModify: false });
};

module.exports = new bookModel();
