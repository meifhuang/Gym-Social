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
  async (req, res, next) => {
    try {
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
        res.status(201).json({
          success: true, 
          message: "registered and logged in", 
          username: req.user.username,
        })
      })
    }
      // })
      // passport.authenticate("local")(req, res, () => {
      //   res.status(201).json({
      //     message: "registered and logged in", 
      //     username: req.user.username
     else {
      res.status(400).json({
        success: false,
        message: "Passwords are not identical.",
      });
    }
  }
  catch (e) {
    console.log(e.message)
    }
  })

router.get("/login", (req, res) => {
  res.json({
    message: "Login",
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    // successRedirect: "/profile",
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log('logged in')
    res.status(200).json({
      success: true, 
      message: "Logged in",
      username: req.user.username,
    })
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
