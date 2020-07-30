const adminServices = require("../services/adminServices");
const admin = require("../model/admin");

module.exports.addBookController = (req, res) => {
  let response = {};
  try {
    req.checkBody("authorName", "Author should not be empty").notEmpty();
    req.checkBody("title", "Title should not be empty").notEmpty();
    req.checkBody("bookName", "bookname should not be empty").notEmpty();
    req.checkBody("quantity", "Quantity should not be empty").notEmpty();
    req.checkBody("price", "Price should not be empty").notEmpty();
    req.checkBody("description", "Description should not be empty").notEmpty();

    let error = req.validationErrors();
    if (error) {
      response.status = false;
      response.error = error;
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
      return new Promise((resolve, reject) => {
        adminServices
          .addBooks(filterData)
          .then((data) => {
            resolve(data);
            response.success = true;
            response.data = data;
            response.message = "Book added  Successfully";
            res.status(200).send({ data: response });
          })
          .catch((err) => {
            reject(err);
            console.log(err);
            response.success = false;
            response.message = err;
            res.status(500).send({ data: response });
          });
      });
    }
  } catch (err) {
    response.status = false;
    response.error = err;
    return res.status(500).send(response);
  }
};
module.exports.getBooks = (req, res) => {
  var id = {
    userId: req.decoded.payload.email,
  };

  let response = {};
  try {
    return new Promise((resolve, reject) => {
      adminServices
        .getAllBooksService(id.userId)
        .then((data) => {
          resolve(data);
          response.success = true;
          response.data = data;
          response.message = "Book details retrieved";
          res.status(200).send({ data: response });
        })
        .catch((err) => {
          reject(err);
          console.log(err);
          response.success = false;
          response.message = err;
          res.status(500).send({ data: response });
        });
    });
  } catch (err) {
    response.success = false;
    response.error = err;
    return res.status(500).send(response);
  }
};
