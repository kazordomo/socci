const mongoose = require('mongoose');
// const Activity = mongoose.model('activity');

module.exports = app => {

    app.get('/api/activity', (req, res) => {
        res.send({'GET': 'api/activity'});
    });

    app.post('/api/activity', (req, res) => {
        res.send({'POST': 'api/activity'});
    });

    app.delete('/api/activity', (req, res) => {
        res.send({'DELETE': 'api/activity'});
    });

}