const mongoose = require('mongoose');
const Activity = mongoose.model('activity');

module.exports = app => {

    app.get('/api/activity', async (req, res) => {

        const activities = await Activity.find();
        res.send(activities);
        
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

            res.status(400).json(err);
        }
        
    });

    app.delete('/api/activity', async (req, res) => {

        try {

            await Activity.deleteOne({ _id: req.body.id });
            res.status(200).end();
            
        } catch(err) {
            
            res.status(400).json(err);
            
        }
        
    });

}