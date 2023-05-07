const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const AppError = require("./utils/AppError");
const catchAsync = require("./utils/CatchAsync");
const Workout = require("./models/workout");
const router = express.Router();
const cors = require("cors");

const authRouter = require("./controllers/auth");
const userRouter = require("./controllers/user");
const googleRouter = require("./auth/googleauth");

const jwtStrategy = require("./auth/index");

const workoutRouter = require("./controllers/workout");
const exerciseRouter = require("./controllers/exercise");
const postRouter = require("./controllers/post");



function createServer() {
  jwtStrategy(passport);

  mongoose.connect(process.env.MONGO_DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  // mongoose.set("strictQuery", false);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection err:"));
  db.once("open", () => {
    console.log("database connected");
  });
  
  // app.use(mongoSanitize());
  // app.use(express.static(path.join(__dirname, "public")));

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(cors());

 
  app.use(authRouter);
  app.use(googleRouter); 
  app.use(passport.authenticate("jwt", { session: false }), workoutRouter);
  app.use(passport.authenticate("jwt", { session: false }), userRouter); 
  app.use(passport.authenticate("jwt", { session: false }), exerciseRouter); 
  app.use(passport.authenticate("jwt", { session: false }), postRouter); 
  
  

  function checkLoggedIn(request, response, next) {
    // console.log(request.cookies);
    // console.log(passport)
    console.log(request.user);
    console.log(request.session);

    if (!request.user) {
      response.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    } else {
      next();
    }
    //   setTimeout(()=> {
    //     next()
    //   }, 2000)
  }

 

  app.get("/protected", checkLoggedIn, function (request, response) {
    try {
      response.status(200).json({
        success: true,
        message: "You should be good",
      });
    } catch (e) {
      console.log(e);
    }
  });


  return app;
}

module.exports = createServer;
