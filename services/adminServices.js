const bookModel = require("../model/admin");

exports.addBooks = (req) => {
  try {
    return new Promise((resolve, reject) => {
      bookModel
        .addBooks(req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } catch (err) {
    return err;
  }
};
exports.getAllBooksService = (req, callBack) => {
  try {
    return new Promise((resolve, reject) => {
      bookModel
        .getBooks(req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  } catch (err) {
    return callBack(err);
  }
};
exports.updateBooks = (_id, req) => {
  return new Promise((resolve, reject) => {
    bookModel
      .updateBook(_id, req)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
