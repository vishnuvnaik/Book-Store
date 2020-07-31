const express = require("express");
const dbConfig = require("./config/dbConfig.js");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
// Configuring the database
const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

const cartRouter = require("./routes/cartRoutes.js");

require("dotenv").config();

//create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use("/", cartRouter);

app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT, () => {
  console.log("server listening on port ", process.env.PORT);
  dbConfig.dbConnection();
});

module.exports = app;
