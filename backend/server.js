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
const cookieParser = require("cookie-parser");


const authRouter = require("./controllers/auth");
const userRouter = require("./controllers/user");
const googleRouter = require("./auth/googleauth");

const jwtStrategy = require("./auth/index");

const workoutRouter = require("./controllers/workout");
const exerciseRouter = require("./controllers/exercise");
const postRouter = require("./controllers/post");
const commentRouter = require("./controllers/comment");
const messageRouter = require("./controllers/message");
const conversationRouter = require("./controllers/conversation");

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
    console.log("database connected", process.env.MONGO_DB);
  });

  // app.use(mongoSanitize());
  // app.use(express.static(path.join(__dirname, "public")));

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: process.env.FRONTEND_URL, // e.g., http://localhost:5173
      credentials: true,
    })
  );

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  app.use(authRouter);
  app.use(googleRouter);
  app.use("/message", messageRouter);
  app.use("/conversation", conversationRouter);
  app.use(passport.authenticate("jwt", { session: false }), workoutRouter);
  app.use(passport.authenticate("jwt", { session: false }), userRouter);
  // app.use("/profile", userRouter);
  // app.use("/profile",userRouter);
  // app.use("/profile",userRouter);
  app.use(passport.authenticate("jwt", { session: false }), exerciseRouter);
  app.use(passport.authenticate("jwt", { session: false }), postRouter);
  app.use(passport.authenticate("jwt", { session: false }), commentRouter);

  return app;
}

module.exports = createServer;
