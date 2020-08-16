const jwt = require("jsonwebtoken");

exports.GenerateToken = (payload) => {
  //function to generate tokens
  const token = jwt.sign({ payload }, process.env.KEY, { expiresIn: "1D" });
  const obj = {
    sucess: true,
    message: "Token generated",
    token: token,
  };

  return obj;
};

exports.verify = (req, res, next) => {
  //function to verify tokens
  var token = req.headers.token;
  jwt.verify(token, process.env.KEY, (err, result) => {
    if (err) {
      res.status(422).send({ message: "provide a valid token" });
    } else {
      req.decoded = result;
      next();
    }
  });
};
