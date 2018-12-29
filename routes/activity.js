const mongoose = require('mongoose');
const Activity = mongoose.model('activity');

module.exports = app => {

    app.get('/api/activity/:id', async (req, res) => {
    
        try {
            const activity = await Activity.find({ _id: req.params.id });
            res.send(activity[0]);
        } catch (err) {
            res.status(400).json(err);
        }
        
    });
    
    app.get('/api/activites', async (req, res) => {
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
    
    app.post('/api/activity/attend/:id', async (req, res) => {
    
        const { id, name } = req.body;
        
        try {
    
            let activity = await Activity.findOne({ _id: req.params.id });
            activity.attendees.push({ id, name });
            await activity.save();
            res.send(activity);
    
        } catch (err) {
            res.status(400).json(err);
        }
    
    });
    
    app.post('/api/activity/decline/:id', async (req, res) => {
        
        try {
    
            let activity = await Activity.findOne({ _id: req.params.id });
            let attendee = activity.attendees.find(attendee => attendee.id === req.body.id);
            activity.attendees.splice(activity.attendees.indexOf(attendee), 1);
            await activity.save();
            res.send(activity);
    
        } catch (err) {
            res.status(400).json(err);
        }
    
    });
    
    app.post('/api/activity/comment/:id', async (req, res) => {
    
        try {
    
            let activity = await Activity.findOne({ _id: req.params.id });
            activity.comments.push(req.body);
            await activity.save();
            res.send(activity);
    
        } catch (err) {
            res.status(400).json(err);
        }
    
    });

}
