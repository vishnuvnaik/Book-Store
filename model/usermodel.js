const mongoose = require("mongoose");
// create instance of Schema
var mongoSchema = mongoose.Schema;
var registrationSchema = new mongoSchema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"] },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", registrationSchema);
