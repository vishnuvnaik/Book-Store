const express = require("express");
const dbConfig = require("./config/dbConfig.js");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
// Configuring the database
const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
const router = require("./routes/userRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const cartRouter = require("./routes/cartRoutes");
const cart = require("./model/cart.js");

require("dotenv").config();

//create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use("/", router);
app.use("/", adminRouter);
app.use("/", cartRouter);

app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT, () => {
  console.log("server listening on port ", process.env.PORT);
  dbConfig.dbConnection();
});

module.exports = app;
