const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../../models/User");
require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const async = require("async");

const salt_rounds = 12;

////////////////////////////////////////////////////

router.post("/forgotPassword", async (req, res) => {
  if (req.body.email === "") {
    res.status(400).send("email required");
  }
  const email = req.body.email;
  const userinfo = await User.findOne({ email: email });
  console.log("before " + userinfo.resetPasswordToken);
  console.log("before " + userinfo.resetPasswordExpires);

  if (!userinfo) {
    return res.json({ msg: "email not in db" });
    // res.status(403).send('email not in db');
  } else {
    const token = await crypto.randomBytes(20).toString("hex");
    console.log("toooken : " + token);
    const tok = { resetPasswordToken: token };
    const mail = { email: email };
    const date = { resetPasswordExpires: Date.now() + 360000 };

    var update_user_1 = await User.findOneAndUpdate(mail, tok);

    var update_user_2 = await User.findOneAndUpdate(mail, date);
    // userinfo.resetPasswordToken = tokenn;
    // userinfo.resetPasswordToken = Date().now + 3600000;

    console.log("after " + userinfo.resetPasswordToken);
    console.log("after " + userinfo.resetPasswordExpires);
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
    console.log("zooonzoo : " + token);
    let mailOptions = {
      from: "theintellegentquestionhr@gmail.com",
      to: userinfo.email,
      subject: "Link to reset your password",
      text:
        "RESET YOUR PASSWORD \n" +
        "https://tiqtiq.herokuapp.com//reset/" +
        token
    };
    console.log("sending email");
    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        return console.log("error occurss :(", err);
      } else {
        console.log("Email sent... :)");
        // console.log(data);
        res.status(200).json("recovery email sent");
      }
    });
  }
});

/////////////////////////////////////////////////////
router.get("/reset/:token", async (req, res) => {
  console.log("zooooba");
  const token = req.params.token;
  console.log(token);

  const user = await User.findOne({ resetPasswordToken: token });
  console.log("ana fe reset function user is : " + user);

  if (user == null) {
    console.error("password reset link is invalid or has expired");
    res.status(403).send("password reset link is invalid or has expired");
  } else {
    res.status(200).send({
      firstName: user.firstName,
      email: user.email,
      message: "password reset link a-ok"
    });
  }
});
////////////////////////////////////////////////////////
router.put("/updatePasswordViaEmail", async (req, res) => {
  const salt = await bcrypt.genSalt(10);

  const user = await User.findOne(
    { email: req.body.email },
    { resetPasswordToken: req.body.resetPasswordToken }
    //{ resetPasswordExpires: { /*[Op.gt]*/ $gt: Date.now() } }
  );
  const ID = user._id;

  if (!user) {
    console.error("password reset link is invalid or has expired");
    res.status(403).send("password reset link is invalid or has expired");
  } else if (user != null) {
    console.log("user exists in db");

    // bcrypt.hash(req.body.password, salt);
    password = await bcrypt.hash(req.body.password, salt);

    console.log(ID);
    const body = {
      password: password,
      resetPasswordToken: null,
      resetPasswordExpires: null
    };

    //var updatedUser = await User.findOneAndUpdate(mail, t);
    var updateUser = await User.findByIdAndUpdate(ID, body);

    console.log("password updated ");
    res.status(200).send({ message: "password updated :)" });
  } else {
    console.error("no user exists in db to update");
    res.status(401).json("no user exists in db to update");
  }
});

module.exports = router;
