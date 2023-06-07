const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    sets: {type: Number, required: true},
    weight: { type: Number, required: true },
    // gif: {type: String, required: true}
})

module.exports = mongoose.model('Exercise', ExerciseSchema);
