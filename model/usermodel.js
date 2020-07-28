const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
// create instance of Schema
var mongoSchema = mongoose.Schema;
var registrationSchema = new mongoSchema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "last name is required"] },
    email: { type: String, required: [true, "email is required"] },
    password: { type: String, required: [true, "password is required"] },
    role: { type: String, required: true, enum: ["user", "admin"] },
  },
  {
    timestamps: true,
  }
);
function usermodel() {}
var user = mongoose.model("user", registrationSchema);
function hash(password) {
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(password, salt);
  return hashPassword;
}
usermodel.prototype.register = (body, callback) => {
  //To find the registered user in database
  user.find({ email: body.email }, (err, data) => {
    if (err) {
      console.log("Error in register user schema ");
      return callback(err);
    } else if (data.length > 0) {
      response = {
        error: true,
        message: "Email already exists ",
        errorCode: 404,
      };
      return callback(response);
    } else {
      const newUser = new user({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hash(body.password),
        role: body.role,
      });
      newUser.save((err, result) => {
        if (err) {
          console.log("error in model file", err);
          return callback(err);
        } else {
          console.log("data save successfully", result);
          return callback(null, result);
        }
      });
    }
  });
};
usermodel.prototype.login = (body, callback) => {
  //The find() method with parameters returns the requested documents from a collection and
  //returns requested fields for the documents. Email of user is requested.
  user.find({ email: body.email }, (err, data) => {
    if (err) {
      return callback(err);
    } else if (data.length > 0) {
      bcrypt.compare(body.password, data[0].password, function (err, res) {
        if (err) {
          return callback(err);
        } else if (res) {
          //console.log(data);

          return callback(null, data);
        } else {
          return callback(
            "Invalid password, Please enter valid password"
          ).status(500);
        }
      });
    } else {
      return callback("Invalid User, please register first to login");
    }
  });
};
usermodel.prototype.forgotPassword = (body, callback) => {
  // console.log("body in model==>",body);

  user.find({ email: body.email }, (err, data) => {
    if (err) {
      return callback(err);
    } else if (data) {
      console.log("data in models==>", data[0]._id);

      //console.log(data)

      return callback(null, data);
    } else {
      return callback("Invalid User ");
    }
  });
};
usermodel.prototype.resetPassword = (req, callback) => {
  //console.log("request------>", req.body);
  let newpassword = bcrypt.hashSync(req.body.password, 10);
  console.log("new password bcrypt --->", newpassword);

  // updateOne() Updates a single document within the collection based on the filter.
  user.updateOne(
    { _id: req.decoded.payload.user_id },
    { password: newpassword },
    (err, data) => {
      if (err) {
        console.log("Error in user resetPassword ");
        return callback(err);
      } else {
        return callback(null, data);
      }
    }
  );
};
module.exports = new usermodel();
