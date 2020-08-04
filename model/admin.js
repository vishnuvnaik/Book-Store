const mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;
var adminSchema = new mongoSchema(
  {
    bookName: { type: String, required: [true, "bookname is required"] },
    authorName: { type: String, required: [true, "authorname is required"] },
    title: { type: String, required: [true, "title is required"] },
    description: { type: String, required: [true, "description is required"] },
    quantity: { type: Number, required: [true, "quantity is required"] },
    price: { type: Number, required: [true, "price is required"] },
  },
  {
    timestamps: true,
  }
);
var Books = mongoose.model("Books", adminSchema);

function bookModel() { }

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
bookModel.prototype.getBooks = (field) => {
  return Books.find(field.find)
}

bookModel.prototype.getAvailableBooks = (field) => {
  return Books.findById(field.bookId)
};

bookModel.prototype.updateBook = (_id, req) => {

  return Books.findByIdAndUpdate(_id, req, { useFindAndModify: false })

};

bookModel.prototype.deleteBook = (_id) => {
  return Books.findByIdAndRemove(_id, { useFindAndModify: false })

};

module.exports = new bookModel();
