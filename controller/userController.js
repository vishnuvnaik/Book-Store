const userService = require("../services/userServices");
const token = require("../middleware/token");
const mailer = require("../middleware/sendMail");

module.exports.register = (req, res) => {
  try {
    req
      .checkBody("firstName", "firstname not valid ")
      .isLength({ min: 2 })
      .isAlpha();
    req
      .checkBody("lastName", "lastname not valid")
      .isLength({ min: 2 })
      .isAlpha();
    req.checkBody("email", "Enter a valid email").isEmail();
    req.checkBody("role", "role not valid").isLength({ min: 2 }).isAlpha();
    req.checkBody("password", "Enter a valid password").isLength({ min: 8 });
    req
      .checkBody("confirmpassword", "passwords do not match")
      .equals(req.body.password);
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.success = false;
      response.message = { message: "Invalid Input" };
      response.error = errors;
      return res.status(422).send(response);
    } else {
      userService.register(req.body, (err, data) => {
        if (err) {
          response.data = err;
          response.sucess = false;
          res.status(500).send(response);
        } else {
          response.data = data;
          response.success = true;
          res.status(200).send(response);
        }
      });
    }
  } catch (err) {
    console.log("error in register controller", err);
  }
};

module.exports.login = (req, res) => {
  try {
    req.checkBody("email", "email id is not valid ").isEmail();
    req.checkBody("password", "password is not valid ").isLength({ min: 8 });
    var error = req.validationErrors();
    var response = {};
    if (error) {
      response.success = false;
      response.error = "email or password not valid";
      return res.status(422).send(response);
    }
    userService.login(req.body, (err, data) => {
      if (err) {
        response.success = false;
        response.error = "email or password not valid";
        return res.status(422).send(response);
      } else {
        response.data = data;
        var payload = {
          email: data[0].email,
          password: data[0].password,
        };
        let code = token.GenerateToken(payload); //generates token for authentication
        response.token = code.token;
        response.data = data;
        response.success = true;
        res.status(200).send(response);
      }
    });
  } catch (err) {
    console.log("error in login controller", err);
  }
};

module.exports.forgotPassword = (req, res) => {
  try {
    userService.forgotPassword(req.body, (err, data) => {
      var responses = {};
      if (err) {
        return res.status(500).send({ message: err });
      } else {
        responses.success = true;
        responses.result = data;
        responses.message = "Forgot link";
        const payload = {
          user_email: req.body.email,
        };

        const code = token.GenerateToken(payload);
        const url = `http://localhost:5000/resetPassword/${code.token}`;
        mailer.sendMail(url, req.body.email);
        responses.success = true;
        res.status(200).send(url);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.resetPassword = (req, res) => {
  try {
    req.checkBody("password", "password not vaild").isLength({ min: 8 });
    req.checkBody("confirmpassword", "set vaild password").isLength({ min: 8 });

    var error = req.validationErrors();
    var response = {};

    if (error) {
      response.data = error;
      response.sucess = false;
      res.status(422).send(response);
    } else {
      userService.resetPassword(req, (err, data) => {
        if (err) {
          response.data = err;
          response.sucess = false;
          res.status(422).send(response);
        } else {
          response.data = data;
          response.success = true;
          res.status(200).send(response);
          console.log("password modified");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
