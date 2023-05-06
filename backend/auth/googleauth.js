const express = require("express");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const cors = require("cors");

router = express.Router();

router.use(cors({origin: true}));

router.use(express.json());

  router.use(passport.initialize());
//   router.use(passport.session())


  passport.use(new GoogleStrategy({
    clientID : process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback: true,
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate
    ({ email: profile.emails[0].value }, 
        {fname: profile.name.givenName,
        lname: profile.name.familyName,
        email: profile.emails[0].value,
        username: profile.username || profile.emails[0].value,
        password: "defaultpassword"}
        , 
        function (err, user) {
            return done(err, user);
    })
}))

  
  router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']}
  ))

  router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  function(req, res) {
    // Successful authentication, redirect home.
    const token = jwt.sign({user:{"email":req.user.email}, id:req.user._id}, process.env.JSONKEY);
        res.status(200).send({
            success: true, 
            message: "YAY",
            token: token,
            userId: req.user._id,
           
        })
    })

    passport.serializeUser((user, done) => {
        console.log("Serialize")
        console.log(user);
        done(null, user)
      })
    
      passport.deserializeUser((user,done)=> {
        console.log("Deserialize");
        console.log(user)
        done(null,user)
      })

  module.exports = router;
