const express = require("express");
const passport = require("passport");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const mongoose = require("mongoose");

router = express.Router();

router.get("/profile/:id", async (req, res) => {
  console.log("accessing profile route");
  const loggedInId = req.user.id;
  const paramId = req.params.id;
  const user = await User.findById(paramId).populate({
    path: "workouts",
    populate: { path: "exercises" },
  });
  const loggedInUser = await User.findById(loggedInId).populate(["following", "followers", "posts"]);
  const workouts = user.workouts;
  const posts = user.posts; 
  const numWorkouts = user.workouts.length;
  const username = user.username;
  const numFollowing = user.following.length;
  const numFollowers = user.followers.length; 
  console.log(numWorkouts);
  res.status(200).json({
    success: true,
    workouts: workouts,
    username: username,
    loggedInId: loggedInId,
    loggedInUserFollowing: loggedInUser.following,
    numFollowing: numFollowing, 
    numFollowers: numFollowers,
    numWorkouts: numWorkouts,
    posts: posts
  });
});

router.get("/newsfeed", async (req, res) => {
  console.log("accessing users ");
  const id = req.user.id;
  try {
    //find all users that are not yourself ...
    const users = await User.find({ _id: { $not: { $eq: id } } }).populate({
      path: "following",
    });
    //get a list of followers
    const yourself = await User.findById(req.user.id).populate("following");
    if (yourself) {
      res.status(200).json({
        success: true,
        users: users,
        following: yourself.following,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "couldnt get followers",
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/profile/:id/follow", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("following");
    const userToFollow = await User.findById(req.params.id).populate(
      "followers"
    );
  
    const isalreadyFollowing = await User.find({
      _id: req.user.id,
      following: { _id: userToFollow._id },
    });
    console.log("already following", isalreadyFollowing);
    console.log(userToFollow);
    if (isalreadyFollowing.length === 0) {
      user.following.push(userToFollow);
      userToFollow.followers.push(user);
      await user.save();
      await userToFollow.save();
    
    } else {
      console.log("coudlnt follow probably cause already following");
    }
    res.status(200).json({
      success: "true",
      following: user.following,
    });
  } catch (e) {
    console.log(e.message);
  }
});

router.delete("/profile/:id/unfollow", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      $pull: { following: req.params.id },
    });
    const userUpdated = await User.findById(req.user.id).populate("following");
    const userToUnfollow = await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.user.id },
    });
    const userToUnfollowUpdated = await User.findById(req.user.id).populate(
      "followers"
    );
  
    if (userUpdated && userToUnfollowUpdated) {
      res.status(200).json({
        success: "true",
        userfollowing: userUpdated.following,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.get("/explore", async (req, res) => {
  console.log("explore");
  const id = req.user.id;
  try {
    //find all users that are not yourself ...
    const users = await User.find({ _id: { $not: { $eq: id } } }).populate({
      path: "following",
    });
    //get list of followers
    const yourself = await User.findById(req.user.id).populate("following");
    if (yourself && users) {
      res.status(200).json({
        success: true,
        users: users,
        following: yourself.following,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "couldnt get followers",
      });
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
