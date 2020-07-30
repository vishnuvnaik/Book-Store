const bookModel = require("../model/admin");

exports.addBooks = (req, callback) => {
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
    return callback(err);
  }
};
exports.getAllBooksService = (data, callBack) => {
  try {
    bookModel.getBooks(data, (err, result) => {
      if (err) {
        return callBack(err);
      } else {
        return callBack(null, result);
      }
    });
  } catch (err) {
    return callBack(err);
  }
};
