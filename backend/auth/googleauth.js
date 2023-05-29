const express = require("express");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router = express.Router();

router.use(express.json());

router.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          done(null, user);
        } else {
          const newUser = new User({
            fname: profile.name.givenName,
            lname: profile.name.familyName,
            email: profile.emails[0].value,
            username: profile.username || profile.emails[0].value,
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
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

//   router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/', session: false }),
//   function(req, res) {
//     const token = jwt.sign({user:{"email":req.user.email}, id:req.user._id}, process.env.JSONKEY);
//     res.redirect(`http://localhost:5173/newsfeed?token=${token}&userId=${req.user._id}`);
//   }
// );

// res.status(200).send({
//     success: true,
//     message: "YAY",
//     token: token,
//     userId: req.user._id,
//

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  function (req, res) {
    const token = jwt.sign(
      { user: { email: req.user.email }, id: req.user._id },
      process.env.JSONKEY
    );
    res.redirect(
      `https://gym-social-two.vercel.app/newsfeed?token=${token}&userId=${req.user._id}`
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
