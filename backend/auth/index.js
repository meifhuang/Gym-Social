const User = require("../models/user");
const argon2 = require("argon2");
const LocalStrategy = require("passport-local");

const Strategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

function jwtStrategy(passport) {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JSONKEY,
      },
      function (payload, done) {
        try {
          //payload holds request object? puts the stuff from object into the user object
          console.log(payload);
          return done(null, { username: payload.username, id: payload.id });
        } catch (e) {
          //first parameter is error callback, second is what returns in user object
          console.log(e);
          return done(e, null);
        }
      }
    )
  );
}

module.exports = jwtStrategy;
