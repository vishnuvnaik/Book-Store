const bookModel = require("../model/admin");

module.exports.addBooks = (req) => {
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
module.exports.getAllBooksService = (req) => {
  let findQuery = {
    find: req.find,
  };
  try {
    return new Promise((resolve, reject) => {
      bookModel
        .getBooks(findQuery)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  } catch (err) {
    return err
  }
};
module.exports.updateBooks = (_id, req) => {
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
module.exports.deleteBook = (_id) => {
  return new Promise((resolve, reject) => {
    bookModel
      .deleteBook(_id)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
