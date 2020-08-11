const mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;
const logger = require("../config/logger")
var adminSchema = new mongoSchema(
  {
    bookName: { type: String, required: [true, "bookname is required"], validate: /^[A-Za-z]+$/ },
    authorName: { type: String, required: [true, "authorname is required"], validate: /^[A-Za-z]+$/ },
    genre: { type: String, required: [true, "genre is required"], validate: /^[A-Za-z]+$/ },
    description: { type: String, required: [true, "description is required"], validate: /^[a-zA-Z ]*$/ },
    quantity: { type: Number, required: [true, "quantity is required"], validate: /^[0-9]*$/ },
    price: { type: Number, required: [true, "price is required"], validate: /^[0-9]*$/ },
  },
  {
    timestamps: true,
  }
);
var Books = mongoose.model("Books", adminSchema);

function bookModel() { }

bookModel.prototype.addBooks = (req) => {
  let bookAdd = new Books(req);
  return bookAdd.save()
}
bookModel.prototype.getBooks = (field) => {
  return Books.find(field.find)
}

bookModel.prototype.getAvailableBooks = (field) => {
  return Books.findById(field.product_id)
};
bookModel.prototype.searchingBooks = async (findingQuery) => {
  try {
    console.log(findingQuery)
    let result = await Books.find(findingQuery)
    if (result.length > 0) {
      logger.info(`books found --->\n\n\t ${result}`);
      return result
    }
    else {
      logger.error(`No books found !`);
      return result
    }
  } catch (error) {
    logger.error(error);

    return error
  }
}

bookModel.prototype.updateBook = (_id, req) => {
  return Books.findByIdAndUpdate(_id, req, { useFindAndModify: false })
};

bookModel.prototype.deleteBook = (_id) => {
  return Books.findByIdAndRemove(_id, { useFindAndModify: false })

};

module.exports = new bookModel();
