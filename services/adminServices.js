const bookModel = require("../model/admin");

exports.addBooks = (req, callback) => {
  try {
    bookModel.addBooks(req, (err, data) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, data);
      }
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
