const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var ObjectID = require("mongodb").ObjectID;
// create instance of Schema
var mongoSchema = mongoose.Schema;
var registrationSchema = new mongoSchema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "last name is required"] },
    email: { type: String, required: [true, "email is required"] },
    password: { type: String, required: [true, "password is required"] },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);
function usermodel() {}
var user = mongoose.model("user", registrationSchema);
// function hash(password) {
//   var salt = bcrypt.genSaltSync(10);
//   var hashPassword = bcrypt.hashSync(password, salt);
//   return hashPassword;
// }

usermodel.prototype.finduser = (body, callback) => {
  user.find({ email: body.email }, (err, data) => {
    if (err) {
      console.log("Error in register user schema ");
      return callback(err);
    } else {
      return callback(null, data);
    }
  });
};

usermodel.prototype.createUser = (body, callback) => {
  const newUser = new user(body);
  newUser.save((err, result) => {
    if (err) {
      console.log("error in model file", err);
      return callback(err);
    } else {
      console.log("data save successfully", result);
      return callback(null, result);
    }
  });
};
usermodel.prototype.update = (req, encrypted, callback) => {
  user.updateOne(
    {
      _id: req.decoded.data_id,
    },
    encrypted,
    (err, data) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, data);
      }
    }
  );
};

module.exports = new usermodel();
