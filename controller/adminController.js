const adminServices = require("../services/adminServices");
const admin = require("../model/admin");

module.exports.addBookController = (req, res) => {
  let response = {};
  try {
    req.checkBody("authorName", "Author should not be empty").notEmpty();
    req.checkBody("title", "Title should not be empty").notEmpty();
    req.checkBody("bookName", "bookname should not be empty").notEmpty();
    req.checkBody("quantity", "Quantity should not be empty").notEmpty().isNumeric();
    req.checkBody("price", "Price should not be empty").notEmpty().isNumeric();
    req.checkBody("description", "Description should not be empty").notEmpty();

    let error = req.validationErrors();
    if (error) {
      response.success = false;
      response.message = { message: "Invalid Input" };
      response.error = errors;
      return res.status(422).send(response);
    } else {
      let filterData = {
        user_id: req.decoded.payload.email,
        authorName: req.body.authorName,
        title: req.body.title,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        bookName: req.body.bookName,
      };

      adminServices
        .addBooks(filterData)
        .then((data) => {
          response.success = true;
          response.data = data;
          response.message = "Book added  Successfully";
          res.status(200).send({ data: response });
        })
        .catch((err) => {
          console.log(err);
          response.success = false;
          response.message = err;
          res.status(500).send({ data: response });
        });
    }
  } catch (err) {
    response.status = false;
    response.error = err;
    return res.status(500).send(response);
  }
};
module.exports.getBooks = (req, res) => {
  let response = {};
  let find = {};
  let getBooks = {
    find,
  };
  try {
    adminServices
      .getAllBooksService(getBooks)
      .then((data) => {
        response.success = true;
        response.data = data;
        response.message = "Book details retrieved";
        res.status(200).send({ data: response });
      })
      .catch((err) => {
        console.log(err);
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      });
  } catch (err) {
    response.success = false;
    response.error = err;
    return res.status(500).send(response);
  }
};
module.exports.updateBooks = (req, res) => {
  let response = {};
  try {
    req.checkBody("title", "Title is invalid ").isAlpha() ||
      req.checkBody("bookName", "bookname is invalid").isAlpha() ||
      req.checkBody("description", "description is invalid").isAlpha() ||
      req.checkBody("quantity", "quantity is invalid").isNumeric() ||
      req.checkBody("authorName", "author is invalid").isAlpha() ||
      req.checkBody("price", "price is invalid").isNumeric();

    let errors = req.validationErrors();
    if (errors) {
      response.success = false;
      let data = { message: "Input accordingly" };
      response.data = data;
      res.status(422).send(response);
    } else {
      adminServices
        .updateBooks(req.params._id, req.body)
        .then((data) => {
          response.success = true;
          response.data = data;
          response.message = "Book Update Successfully";
          res.status(200).send({ data: response });
        })
        .catch((err) => {
          console.log(err);
          response.success = false;
          response.message = err;
          res.status(404).send({ data: response });
        });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.deleteBook = (req, res) => {
  var response = {};
  adminServices
    .deleteBook(req.params._id)
    .then((data) => {
      if (!data) {
        response.success = false;
        response.message = "Book not found with id " + req.params._id;
        res.status(404).send({ data: response });
      } else {
        response.success = true;
        response.data = data;
        console.log(response);
        response.message = "Book Deleted Successfully";
        res.status(200).send({ data: response });
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        response.success = false;
        response.message = "Inputted an invalid BookID = " + req.params._id;
        res.status(404).send({ data: response });
      } else {
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      }
    });
};
