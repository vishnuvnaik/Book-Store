var nodemailer = require('nodemailer');

exports.sendMail = (url, email) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },

    });
    console.log("email", process.env.EMAIL);
    var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'reset password',
        text: url

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response + token + "code is " + code);
        }
    });
}