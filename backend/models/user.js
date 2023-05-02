const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const UserSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  workouts: [{
  type: Schema.Types.ObjectId,
  ref: 'Workout'
}], 
  following: [{type: Schema.Types.ObjectId, ref: 'User'}], 
  followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});


module.exports = mongoose.model("User", UserSchema);
