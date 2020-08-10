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
const customerRouter = require("./routes/customerRoutes");
const orderRouter = require("./routes/orderRoutes");
const logger = require("./config/logger");
const customer = require("./model/customer.js");


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
app.use("/", customerRouter);
app.use("/", orderRouter);

app.use(bodyParser.urlencoded({ extended: true }));
// app.listen(process.env.PORT, () => {
//   logger.info(`server is listening to ${process.env.PORT}`);
// })
const server = app.listen(process.env.PORT, () => {
  logger.info("server listening on port ", process.env.PORT);
  dbConfig.dbConnection();
});

module.exports = app;
