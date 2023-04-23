const express = require("express");
const catchAsync = require("../utils/CatchAsync");
const passport = require("passport");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const User = require("../models/user");

router = express.Router();

const isLoggedIn = function (req, res, next) {
  if (!request.user) {
    response.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  } else {
    next();
  }
};

router.get("/profile", async (req, res) => {
  console.log("accessing profile route");
  const user = await User.findById(req.user.id).populate("exercises");
  const workout_list = user.exercises;
  const username = user.username;

  res.status(200).json({
    success: true,
    workout_list: workout_list,
    message: "HELLO",
    username: username,
  });
});

router.post(
  "/createworkout",
  catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id);
    console.log("user logged in is", user);
    const { name, weight, sets, reps } = req.body;
    const exercise = new Exercise({ name, weight, sets, reps });
    user.exercises.push(exercise);
    // workout.creator = req.user._id;
    // workout.exercises.push(exercise);
    await exercise.save();
    await user.save();
    console.log("Added exercise!");

    res.status(200).json({
      success: "true",
      exercises: user.exercises
    });
  })
);

module.exports = router;
