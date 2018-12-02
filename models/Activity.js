const mongoose = require('mongoose');

let ActivitySchema = new mongoose.Schema({
    title: String,
    information: String,
    time: String,
    attendees: Array,
    // TODO: comments should be its own model
    comments: Array,
    // TODO: Implement _user when login/register is finnished
    // _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

let Activity = mongoose.model('activity', ActivitySchema);
module.exports = Activity;