const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date, default: Date.now
    },
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Exercise'
        }
    ]
})

module.exports = mongoose.model('Workout', WorkoutSchema);
