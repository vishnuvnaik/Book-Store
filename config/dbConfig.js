const mongoose = require("mongoose");

exports.dbConnection = () => {
  var db = mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Succesfully connected to Database");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Could not connect to the database ");
    process.exit();
  });

  mongoose.connection.on("error", () => {
    console.log("Error in Connecting to Database");
    process.exit(1);
  });
};
