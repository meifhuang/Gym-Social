const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const User = require("./models/user");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const AppError = require("./utils/AppError");
const catchAsync = require("./utils/CatchAsync");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Workout = require("./models/workout");
const router = express.Router();

const authRouter = require("./controllers/auth");
const workoutRouter = require("./controllers/workout");

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("strictQuery", false);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection err:"));
db.once("open", () => {
  console.log("database connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(mongoSanitize());

const sessionConfig = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
    maxAge: (1000 * 60) ^ (60 * 60 * 24 * 7),
  },
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());


// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy())
//how to serialize user - store user in a session
passport.serializeUser(User.serializeUser());
//unstore 
passport.deserializeUser(User.deserializeUser());

//middleware
// app.use((req, res, next) => {
//   res.locals.currentUser = res.locals.currentUser || req.user
//   console.log("currentUser", req.currentUser)
//   next();
// });

app.get("/", (req, res) => {
  res.json({
    message: "Gym Social",

  });
});

app.use(authRouter);
app.use(workoutRouter);

//if none of the routes prior to this matches

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  next(err);
});

//note : eventually create an error template page?
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(status).send({ err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
