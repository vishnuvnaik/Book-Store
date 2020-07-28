const model = require("../model/usermodel.js");
const bcrypt = require("bcryptjs");

exports.register = (req, callback) => {
  model.find(
    {
      email: req.email,
    },
    (err, data) => {
      if (err) {
        callback("user exist");
      } else if (data.length > 0) {
        callback("email exists");
      } else {
        bcrypt.hash(req.password, 10, function (err, hash) {
          var newUser = new model({
            firstName: req.firstName,
            lastName: req.lastName,
            email: req.email,
            password: hash,
            role: req.role,
          });
          newUser.save((err, result) => {
            if (err) {
              return callback(err);
            } else {
              callback(null, result);
            }
          });
        });
      }
    }
  );
};

exports.login = (req, callback) => {
  model.find(
    {
      email: req.email,
    },
    (err, data) => {
      if (err) {
        return callback(err);
      } else if (data.length > 0) {
        bcrypt.compare(req.password, data[0].password, (err, res) => {
          if (err) {
            return callback(err);
          } else if (res) {
            console.log("login successful");
            return callback(null, data);
          } else {
            console.log("password incorrect");
            return callback("password incorrect").status(500);
          }
        });
      } else {
        console.log(req.email);
        console.log("email is not found in the database , try again ");
        return callback("Invalid User");
      }
    }
  );
};

exports.forgotPassword = (req, callback) => {
  model.find({ email: req.email }, (err, data) => {
    if (err) {
      return callback(err);
    } else if (data) {
      console.log("Data in usermodel ", data);
      return callback(null, data);
    } else {
      return callback("invalid user");
    }
  });
};

exports.resetPassword = (req, callback) => {
  bcrypt.hash(req.body.confirmpassword, 10, (err, data) => {
    model.updateOne(
      { email: req.body.email },
      {
        password: data,
      },
      (err, data) => {
        if (data) {
          callback(null, data);
        } else {
          callback("error");
        }
      }
    );
  });
};
