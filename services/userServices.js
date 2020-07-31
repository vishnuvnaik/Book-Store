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
          callback("user exist");
        } else if (data.length > 0) {
          callback("email exists");
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
          return callback(err);
        } else if (data.length > 0) {
          bcrypt.compare(req.password, data[0].password, (err, res) => {
            if (err) {
              return callback(err);
            } else if (res) {
              return callback(null, data);
            } else {
              return callback("password incorrect").status(500);
            }
          });
        } else {
          return callback("Invalid User");
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
      return callback(err);
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
        callback(err);
      } else {
        model.update(
          req,
          {
            password: encrypted,
          },
          (err, data) => {
            if (err) {
              callback(err);
            } else {
              callback(null, data);
            }
          }
        );
      }
    });
  } catch (err) {
    callback(err);
  }
};
