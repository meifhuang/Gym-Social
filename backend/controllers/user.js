const express = require("express");
const passport = require("passport");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const mongoose = require("mongoose");

router = express.Router();


router.get("/newsfeed", async (req, res) => {
    console.log("accessing users ");
    const id = req.user.id; 
    const users = await User.find({_id: { $not: {$eq: id} }});
    // const user = await User.findById(req.user.id).populate({path: 'workouts', populate: { path: "exercises" }});
    // const workouts = user.workouts; 
    console.log(users);
    res.status(200).json({
      success: true,
      users: users
    });
  });



  module.exports = router;