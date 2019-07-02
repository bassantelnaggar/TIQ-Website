const express = require("express");

const router = express.Router();
const User = require("../../models/User");
require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

router.post("/forgotPassword", async (req, res) => {
  if (req.body.email === "") {
    res.json("email required");
  }
  const email = req.body.email;
  console.log(email);
  const userinfo = await User.findOne({ email: email });
  console.log("koko: " + userinfo);
  try {
    if (userinfo === null) {
      console.log("hoooooooooooooooooooo :  " + userinfo);
      res.json("This email is not in DB");
    } else {
      const tokenn = await crypto.randomBytes(20).toString("hex");
      console.log("toooken : " + tokenn);
      userinfo.update({
        resetPasswordToken: tokenn,
        resetPasswordExpires: Date().now + 36000
      });
    }
  } catch {
    res.json("Can't Find this email");
  }
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,

    auth: {
      user: process.env.Email,
      pass: process.env.PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: "theintellegentquestionhr@gmail.com",
    to: userinfo.email,
    subject: "Link to reset your password",
    text:
      "RESET YOUR PASSWORD \n" +
      "http://localhost:3000/reset/" +
      userinfo.resetPasswordToken
  };
  console.log("sending email");
  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      return console.log("error occurss :(", err);
    } else {
      console.log("Email sent... :)");
      console.log(data);
      res.status(200).json("recovery email sent");
    }
  });
});

module.exports = router;
