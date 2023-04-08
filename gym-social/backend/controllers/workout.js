const express = require("express");
const catchAsync = require("../utils/CatchAsync");
const passport = require("passport");

router = express.Router();

router.post(
  "/workout",
  catchAsync(async (req, res) => {
    const workout = new Workout(req.body);
    await workout.save();

    res.redirect("/home");
  })
);

module.exports = router;
