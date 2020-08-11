const Service = require("../services/adminServices");
const adminServices = new Service();
const logger = require("../config/logger");
module.exports.addBookController = (req, res) => {
  let response = {};
  try {
    req
      .checkBody("authorName", "Author should not be empty")
      .notEmpty()
      .isAlpha();
    req.checkBody("genre", "genre should not be empty").notEmpty().isAlpha();
    req.checkBody("bookName", "bookname should not be empty").notEmpty();
    req.checkBody("quantity", "Quantity should not be empty").isNumeric();
    req.checkBody("price", "Price should not be empty").isNumeric();
    req.checkBody("description", "Description should not be empty").notEmpty();

    let error = req.validationErrors();
    if (error) {
      response.success = false;
      response.message = { error };

      return res.status(422).send(response);
    } else {
      let filterData = {
        authorName: req.body.authorName,
        genre: req.body.genre,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        bookName: req.body.bookName,
        userId: req.decoded.payload.id,
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
    pageNo: req.body.pageNo,
    size: req.body.size,
  };
  try {
    adminServices
      .getAllBooksService(getBooks)
      .then((data) => {
        response.success = true;
        response.data = data;
        response.message = "Book details retrieved";
        logger.info("books retreived");
        res.status(200).send({ data: response });
      })
      .catch((err) => {
        console.log(err);
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      });
  } catch (err) {
    this.errorHandling(err);
  }
};
module.exports.updateBooks = (req, res) => {
  let response = {};
  try {
    req.checkBody("quantity", "quantity is invalid").isNumeric() ||
      req.checkBody("genre", "genre is invalid ").isAlpha() ||
      req.checkBody("bookName", "bookname is invalid").isAlpha() ||
      req.checkBody("description", "description is invalid").isAlpha() ||
      req.checkBody("authorName", "author is invalid").isAlpha() ||
      req.checkBody("price", "price is invalid").isNumeric();

    let errors = req.validationErrors();
    if (errors) {
      response.success = false;
      let data = { errors };
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
    this.errorHandling(err);
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
      this.errorHandling(err);
    });
};
module.exports.searchingBooks = async (req, res) => {
  try {
    //what is to be searched has to be mentioned , you cant leave it empty
    req.checkBody("search", "SEARCH FIELD SHOULD NOT BE EMPTY").notEmpty();
    let errorsGenerated = req.validationErrors();
    let response = {};
    if (errorsGenerated) {
      response.success = false;
      response.message = "Errors are generated in the request ! ";
      response.error = errorsGenerated;
      return res.status(422).send(response);
    } else {
      let result = await adminServices.searchingBooks(req.body);
      if (result.success) {
        res.status(200).send(result); // OK
      } else {
        res.status(404).send(result); // NOT FOUND
      }
    }
  } catch (error) {
    this.errorHandling(err);
  }
};

module.exports.errorHandling = (err) => {
  logger.error(err);
  if (
    err instanceof SyntaxError ||
    err instanceof EvalError ||
    err instanceof RangeError ||
    err instanceof ReferenceError ||
    err instanceof TypeError
  ) {
    logger.error("Programming Error", err);
    return res.status(500).send(err);
  } else {
    logger.warn("UserDefined", err);
    //result.message = err.message.toString();
  }
};
