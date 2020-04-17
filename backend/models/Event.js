const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    time_spent: {
        type: Number
    },
    collaborators: {
        type: String
    },
    difficulty: {
        type: Number
    },
    category: {
        type: String
    },
    date: {
        type: Date
    },
    completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Event', Event);
