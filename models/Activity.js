const mongoose = require('mongoose');

let ActivitySchema = new mongoose.Schema({
    title: Number,
    information: String,
    attendees: Array
    // TODO: Implement _user when login/register is finnished
    // _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

let Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;