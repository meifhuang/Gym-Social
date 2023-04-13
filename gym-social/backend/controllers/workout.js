const express = require("express");
const catchAsync = require("../utils/CatchAsync");
const passport = require("passport");
const Workout = require('../models/workout');
const Exercise = require('../models/exercise');

router = express.Router();


const isLoggedIn = function (req, res, next) { 
  if (!req.isAuthenticated()) {
      // req.flash('error', "Sign in to complete action")
      return next(new Error('user is not authenticated'))
  }
  next();
}

router.get('/profile', isLoggedIn, async (req, res) => {
  console.log("accessing profile route")
  const workout_list = await Workout.find({});
  res.json({
    workout_list
  });
})

router.post(
  "/createworkout",
  catchAsync(async (req, res) => {
    // const workout = new Workout(req.body);
    const {name, weight, sets, reps} = req.body 
    const exercise = new Exercise({name, weight, sets, reps});
    exercise.creator = req.user._id;
    await exercise.save()
    console.log("Added exercise!")
  }
  ));

module.exports = router;
