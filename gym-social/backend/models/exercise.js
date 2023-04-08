const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: String,
    reps: Number,
    sets: Number,
    weight: Number
})

module.exports = mongoose.model('Exercise', ExerciseSchema);
