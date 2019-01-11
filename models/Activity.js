const mongoose = require('mongoose');

let ActivitySchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20
    },
    information: {
        type: String,
        maxlength: 240
    },
    time: String,
    attendees: Array,
    comments: Array,
    createdAt: { type: Date, default: Date.now },
    _user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

let Activity = mongoose.model('activity', ActivitySchema);
module.exports = Activity;