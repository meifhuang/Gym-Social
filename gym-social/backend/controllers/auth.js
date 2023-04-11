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
      res.redirect("/home");
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
    res.status(201).json({
      message: "Logged in",
      currentUser,
    });
    //   res.redirect("/home").json({
    //     message: "Logged in"
    // });
  }
);

module.exports = router;
