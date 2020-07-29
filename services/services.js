const model = require("../model/usermodel.js");

exports.register = (req, callback) => {
  model.register(req, (err, data) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, data);
    }
  });
};

exports.login = (req, callback) => {
  model.login(req, (err, data) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, data);
    }
  });
};
exports.update = (req, callback) => {
  model.update(req, (err, data) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, data);
    }
  });
};

exports.forgotPassword = (req, callback) => {
  model.forgotPassword(req, (err, data) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, data);
    }
  });
};

exports.resetPassword = (req, callback) => {
  model.resetPassword(req, (err, data) => {
    if (err) {
      return callback(err);
    } else {
      return callback(null, data);
    }
  });
};
