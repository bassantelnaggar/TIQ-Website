const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../../models/User");
require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const async = require("async");

const salt_rounds = 12;
// router.post("/forgotPassword", function(req, res, next) {
//   async.waterfall(
//     [
//       function(done) {
//         crypto.randomBytes(20, function(err, buf) {
//           let token = buf.toString("hex");
//           done(err, token);
//         });
//       },
//       function(token, done) {
//         User.findOne({ email: req.body.email }, function(err, user) {
//           if (!user) {
//             req.flash("error", "No user with that email address exists.");
//             return res.redirect("/forgotPassword");
//           }

//           user.resetPasswordToken = token;
//           user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//           user.save(function(err) {
//             done(err, token, user);
//           });
//         });
//       },
//       function(token, user, done) {
//         let transporter = nodemailer.createTransport({
//           service: "gmail",
//           secure: false,
//           port: 25,

//           auth: {
//             user: process.env.Email,
//             pass: process.env.PASSWORD
//           },
//           tls: {
//             rejectUnauthorized: false
//           }
//         });

//         let mailOptions = {
//           from: "theintellegentquestionhr@gmail.com",
//           to: user.email,
//           subject: "Password Reset Request",
//           text:
//             "Hello " +
//             user.firstName +
//             ",\n\n" +
//             "RESET YOUR PASSWORD \n" +
//             "http://localhost:3000/reset/" +
//             token
//         };
//         transporter.sendMail(mailOptions, function(error, info) {
//           if (error) {
//             console.log(error);
//           } else {
//             console.log("Email sent: " + info.response);
//           }
//           res.send({ msg: "success" });
//         });
//       }
//     ],
//     function(err) {
//       if (err) return next(err);
//       res.redirect("/forgot");
//     }
//   );
// });
///////////////////////////////////////////////////////

// router.get("/reset/:token", function(req, res) {
//   console.log("zooooooombaaaaaaaaaaa");
//   // const password = req.body.password;
//   async.waterfall(
//     [
//       console.log("2"),
//       console.log(req.params.token),

//       function(done) {
//         User.findOne(
//           {
//             resetPasswordToken: req.params.token
//             // resetPasswordExpires: { $gt: Date.now() }
//           },
//           function(err, user) {
//             console.log("2"), console.log(user);

//             if (!user) {
//               req.flash(
//                 "error",
//                 "Password reset token is invalid or has expired."
//               );
//               console.log("zooooooombaaaaaaaaaaa");
//               console.log(user);
//               console.log(user.email);
//               console.log(user.resetPasswordToken);

//               return res.redirect("/signin");
//             }
//             const salt = bcrypt.genSaltSync(10);
//             const hashedPassword = bcrypt.hashSync(req.body.password, salt);

//             user.password = hashedPassword;
//             user.resetPasswordToken = undefined;
//             user.resetPasswordExpires = undefined;

//             user.save(function(err) {
//               done(err, user);
//             });
//           }
//         );
//       },
//       function(user, done) {
//         let transporter = nodemailer.createTransport({
//           service: "gmail",
//           secure: false,
//           port: 25,

//           auth: {
//             user: process.env.Email,
//             pass: process.env.PASSWORD
//           },
//           tls: {
//             rejectUnauthorized: false
//           }
//         });
//         let mailOptions = {
//           to: user.email,
//           from: process.env.Email,
//           subject: "Your password has been changed",
//           text:
//             "Hello " +
//             user.firstName +
//             ",\n\n" +
//             "This is a confirmation that the password for your account " +
//             user.email +
//             " has just been changed.\n"
//         };
//         transporter.sendMail(mailOptions, function(err, info) {
//           if (error) {
//             console.log(error);
//           } else {
//             console.log("Email sent: " + info.response);
//           }
//           req.flash("success", "Success! Your password has been changed.");
//           done(err);
//         });
//         res.send({ msg: "success" });
//       }
//     ],
//     function(err) {
//       res.redirect("/");
//     }
//   );
// });

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
      text: "RESET YOUR PASSWORD \n" + "http://localhost:3000/reset/" + token
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

    console.log("password updated :)");
    res.status(200).send({ message: "password updated :)" });
  } else {
    console.error("no user exists in db to update");
    res.status(401).json("no user exists in db to update");
  }
});

module.exports = router;
