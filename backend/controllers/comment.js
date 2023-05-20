const express = require("express");
const Post = require("../models/post")
const User = require("../models/user");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

router = express.Router();

router.post("/createcomment", async (req, res) => {
    console.log("creating"); 
})