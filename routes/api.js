const mongoose = require('mongoose');
const Activity = mongoose.model('activity');

module.exports = app => {

    app.get('/api/activity', (req, res) => {
        res.send({'GET': 'api/activity'});
    });

    app.post('/api/activity', async (req, res) => {

        const { title, information, time, attendees } = req.body;

        let newActivity = new Activity({
            title,
            information,
            time,
            attendees,
        });

        try {

            await newActivity.save();
            res.status(200).end();

        } catch(err) {

            res.status(400).json({ 
                success: false,
                status: 400, 
                message: 'There was a problem creating the activity.' 
            });
        }
        
    });

    app.delete('/api/activity', (req, res) => {
        res.send({'DELETE': 'api/activity'});
    });

}