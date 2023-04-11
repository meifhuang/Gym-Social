const express = require("express");
const catchAsync = require("../utils/CatchAsync");
const passport = require("passport");
const User = require("../models/user");
router = express.Router();

router.get("/register", (req, res) => {
  res.json({ messsage: "Hi" });
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    const { fname, lname, email, username, password, cpassword } = req.body;
    if (password === cpassword) {
      const user = new User({
        fname,
        lname,
        email,
        username,
      });
      const registeredUser = await User.register(user, password);
      console.log("Successfully registered");
      req.login(registeredUser, err => {
        if (err) return next(err);
        console.log('Logged in')

      })
    } else {
      res.status(400).json({
        success: false,
        message: "Passwords are not identical.",
      });
    }
  })
);

router.get("/login", (req, res) => {
  res.json({
    message: "Login",
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    console.log('logging in')
    res.status(201).json({
      message: "Logged in",
    });
    //   res.redirect("/home").json({
    //     message: "Logged in"
    // });
  }
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    console.log("Logged out!")
    res.redirect('/')
  })
})

module.exports = router;
