const model = require("../model/user.js");
var bcrypt = require("bcrypt");

exports.register = (req, callback) => {
  let emailnew = {
    email: req.email,
  };
  try {
    model.finduser(
      {
        email: emailnew.email,
      },
      (err, data) => {
        if (err) {
          return callback("error occured");
        } else if (data.length > 0) {
          return callback("email exists");
        } else {
          bcrypt.hash(req.password, 10, function (err, hash) {
            model.createUser(
              {
                firstName: req.firstName,
                lastName: req.lastName,
                email: req.email,
                password: hash,
                role: req.role,
              },
              (err, data) => {
                if (err) {
                  return callback(err, null);
                } else {
                  return callback(null, data);
                }
              }
            );
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.login = (req, callback) => {
  let emaillogin = {
    email: req.email,
  };
  try {
    model.finduser(
      {
        email: emaillogin.email,
      },
      (err, data) => {
        if (err) {
          return callback(err, null);
        } else if (data.length > 0) {
          bcrypt.compare(req.password, data[0].password, (err, res) => {
            if (err) {
              return callback(err, null);
            } else if (res) {
              return callback(null, data);
            } else {
              return callback("password is incorrect try again");
            }
          });
        } else {
          return callback("Email doesnot exist in database");
        }
      }
    );
  } catch (err) {
    return err;
  }
};

exports.forgotPassword = (req, callback) => {
  model.finduser({ email: req.email }, (err, data) => {
    if (err) {
      return callback(err, null);
    } else if (data) {
      return callback(null, data);
    } else {
      return callback("invalid user");
    }
  });
};

exports.resetPassword = (req, callback) => {
  try {
    bcrypt.hash(req.body.password, 7, (err, encrypted) => {
      if (err) {
        callback(err, null);
      } else {
        model.update(
          req,
          {
            password: encrypted,
          },
          (err, data) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, data);
            }
          }
        );
      }
    });
  } catch (err) {
    callback(err, null);
  }
};
