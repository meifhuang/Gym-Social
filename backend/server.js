const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const AppError = require("./utils/AppError");
const catchAsync = require("./utils/CatchAsync");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const session = require("express-session");
const Workout = require("./models/workout");
const router = express.Router();
// const setupLocalStrategy = require("./auth/local");
const authRouter = require("./controllers/auth");
const userRouter = require("./controllers/user");

const jwtStrategy = require("./auth/index");
// const authRouter = require("./controllers/auth");
const workoutRouter = require("./controllers/workout");
const exerciseRouter = require("./controllers/exercise");
const postRouter = require("./controllers/post");

const multer = require('multer');
const {storage} = require('./cloudinary/index');
const upload = multer({storage});

function createServer() {
  jwtStrategy(passport);

  mongoose.connect(process.env.MONGO_DB, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  // mongoose.set("strictQuery", false);
  const db = mongoose.connection;
  // db.on("error", console.error.bind(console, "connection err:"));
  // db.once("open", () => {
  //   console.log("database connected");
  // });
  app.use(cors());
  // app.use(mongoSanitize());
  // app.use(express.static(path.join(__dirname, "public")));

  app.use(express.json());

 
  app.use(authRouter);
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

  // middleware
  // app.use((req, res, next) => {
  //   // console.log(req);
  //   res.locals.currentUser = req.user;
  //   console.log(req.user);
  //   next();
  // });

  // app.get("/", (req, res) => {
  //   res.json({
  //     message: "Gym Social",
  //   });
  // });

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


  //if none of the routes prior to this matches

  // app.all("*", (req, res, next) => {
  //   next(new AppError("Page Not Found", 404));
  // });

  //note : eventually create an error template page?
  // app.use((err, req, res, next) => {
  //   const { status = 500 } = err;
  //   console.log(err);
  //   if (!err.message) err.message = "Something went wrong";
  //   res.status(status).send({ err });
  // });


  return app;
}

module.exports = createServer;
