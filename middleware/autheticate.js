const jwt = require("jsonwebtoken");

exports.checkTokenAuth = (req, res, next) => {
  var token1 = req.headers.token;
  if (token1) {
    jwt.verify(token1, "secretkey-auth", (err, decoded) => {
      if (err) {
        return res.status(401).send({
          status: false,
          message: "Unauthorised access, please provide valid token!",
        });
      } else if (decoded.payload.role == "admin") {
        req.decoded = decoded;
        next();
      } else {
        return res.send({
          status: false,
          message: "Not authorised!Only admin has access",
        });
      }
    });
  } else {
    return res.send({
      status: false,
      message: "No token provided!!!!",
    });
  }
};
