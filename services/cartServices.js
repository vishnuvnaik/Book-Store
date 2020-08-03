const cartModel = require("../model/cart");
const bookModel = require("../model/admin");

exports.addToCart = (req, callback) => {
  try {
    return new Promise((resolve, reject) => {
      bookModel.getAvailableBooks({ bookId: req.book_id }).then((data) => {
        console.log(data.data.quantity)
        if (data.data.quantity > req.quantity) {
          resolve(data)
          return new Promise((resolve, reject) => {
            cartModel
              .addToCart(req)
              .then((data) => {
                resolve(data);
              })
              .catch((err) => {
                reject(err);
              })
          })
        }
        else {
          return callback(err)
        }
      }).catch((err) => {
        reject(err);
      })
    })

  } catch (err) {
    return err;
  }

  //bookModel.getAvailableBooks({ bookId: req.book_id },
  // (err, data) => {
  //   console.log(req)
  //   console.log(data.quantity)
  //   let quan = req.quantity;
  //   let quandata = data.quantity;
  //   if (err) {
  //     return callback("error occured");
  //   }
  //   else if (quan < quandata) {
  //     cartModel.addToCart(
  //       req,
  //       (err, data) => {
  //         if (err) {
  //           console.log("error")
  //           return callback(err, null);
  //         } else {
  //           console.log("data is")
  //           return callback(null, data);
  //         }
  //       }
  //     );
  //   }
  //   else {
  //     return callback("quantity is less ");
  //   }
  // });

};
exports.getAllItemsFromCart = (req, callBack) => {

  try {
    return new Promise((resolve, reject) => {
      cartModel
        .getAllItemsFromCart(req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  } catch (err) {
    return callBack(err, null);
  }
};
