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
  const user = await User.findById(paramId).populate({path: 'workouts', populate: { path: "exercises" }});
  const loggedInUser = await User.findById(loggedInId).populate("following");
  const workouts = user.workouts; 
  console.log('printing following', loggedInUser.following);
  const username = user.username;
  res.status(200).json({
    success: true,
    workouts: workouts, 
    username: username,
    loggedInId: loggedInId,
    loggedInUserFollowing: loggedInUser.following
  });
});



router.get("/newsfeed", async (req, res) => {
    console.log("accessing users ");
    const id = req.user.id; 
    try {
    //find all users that are not yourself ... 
    const users = await User.find({_id: { $not: {$eq: id} }}).populate({path: 'following'}); 
    //get a list of followers
    const yourself = await User.findById(req.user.id).populate('following');
    if (yourself) {
    res.status(200).json({
      success: true,
      users: users, 
      following: yourself.following
    });
  }
  else {
    res.status(400).json({
      success: false,
      message: 'couldnt get followers'
    });
  }
}
    catch (e) {
      console.log(e.message);
    }
  });


  router.post(
    "/profile/follow",
    async (req, res) => {
      try {
      const user = await User.findById(req.user.id).populate('following');
      const followUser = await User.findById(req.body.id); 
      console.log(req.body.id); 
      console.log(user);
      const alreadyFollowing = await User.find({_id: req.user.id, following: { _id : followUser._id}});
      console.log('already following', alreadyFollowing);
      if (alreadyFollowing.length === 0) {
        user.following.push(followUser);
        await user.save();
        console.log("followed", followUser);
      }
      else {
        console.log('coudlnt follow probably cause already following');
      }
      res.status(200).json({
        success: "true",
        following: user.following
      });
    }
    catch (e) {
      console.log(e.message);
    }
  });

  router.delete("/profile/:id/unfollow", async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {$pull: {following: req.params.id}})
      console.log('review deleted');
      const userUpdated = await User.findById(req.user.id).populate('following');
      console.log(userUpdated); 
      if (userUpdated) {
        res.status(200).json({
          success: "true",
          userfollowing: userUpdated.following
        })
      }
    }
    catch (e) {
      console.log(e.message)
    }
  })


  router.get("/explore", async (req, res) => {
    console.log("explore");
    const id = req.user.id; 
    try {
    //find all users that are not yourself ... 
    const users = await User.find({_id: { $not: {$eq: id} }}).populate({path: 'following'}); 
    //get list of followers
    const yourself = await User.findById(req.user.id).populate('following');
    if (yourself && users) {
    res.status(200).json({
      success: true,
      users: users,
      following: yourself.following
    });
  }
  else {
    res.status(400).json({
      success: false,
      message: 'couldnt get followers'
    });
  }
}
    catch (e) {
      console.log(e.message);
    }
  });



  // const notFollow = res.data.users.filter(x => !res.data.following.find(y => y._id === x._id))


  module.exports = router;