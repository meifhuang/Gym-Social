const { isAlpha } = require("validator");
const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String, 
  filename: String
})

const UserSchema = new Schema({
  fname: {
    type: String,
    required: true,
    validate: [isAlpha, "Please enter letters only."],
  },
  lname: {
    type: String,
    required: true,
    validate: [isAlpha, "Please enter letters only."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email."]
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "Bio"
  }, 
  workouts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout",
    },
  ],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  saved: [{type: Schema.Types.ObjectId, ref: "Workout"}],
  picture: [ImageSchema]
});

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
