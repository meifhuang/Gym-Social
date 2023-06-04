const express = require("express");
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const FRONTEND_URL = process.env.FRONTEND_URL;
router = express.Router();

router.use(express.json());

router.use(passport.initialize());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: `/auth/facebook/callback`,
      profileFields: ["id", "displayName", "photos", "email"],
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, email, done) {
      console.log("EMAILEMAIL", email);
      console.log("PROFILEPROFILE", profile);
      try {
        const user = await User.findOne({ email: email._json.email });
        if (user) {
          done(null, user);
        } else {
          const indexOfAt = email._json.email.indexOf("@");
          const newUser = new User({
            fname: email.displayName.split(" ")[0],
            lname: email.displayName.split(" ")[1],
            email: email._json.email,
            username: email.username || email._json.email.slice(0, indexOfAt),
            password: "defaultpassword",
          });
          const file = {
            url: "https://res.cloudinary.com/dxq4m23dd/image/upload/v1683580896/Gym-Social/byytsi7td2m3hy6gbtww.png",
            filename: "Gym-Social/byytsi7td2m3hy6gbtww",
          };
          newUser.picture.push(file);
          await newUser.save();
          done(null, newUser);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);


router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email"], 
  })
);


router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/", session: false }),
  function (req, res) {
    const token = jwt.sign(
      { user: { email: req.user.email }, id: req.user._id },
      process.env.JSONKEY
    );
    // Successful authentication, redirect home.
    res.redirect(
      `${FRONTEND_URL}/profile/${req.user._id}?token=${token}&userId=${req.user._id}`
    );
  }
);

router.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Internal server error");
});

passport.serializeUser((user, done) => {
  console.log("Serialize");
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("Deserialize");
  console.log(user);
  done(null, user);
});

module.exports = router;


