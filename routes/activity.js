const mongoose = require('mongoose');
const Activity = mongoose.model('activity');
const User = mongoose.model('user');
const { requiresLogin } = require('../middlewares/auth');

module.exports = app => {

    app.get('/api/activity/:id', requiresLogin, async (req, res) => {
        try {
            const activity = await Activity.find({ _id: req.params.id });
            res.send(activity[0]);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    
    app.get('/api/activites', requiresLogin, async (req, res) => {
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
        try {
            let activity = await Activity.findOne({ _id: req.params.id });
            let isAttending = activity.attendees.find(attendee => attendee._id === req.session.user._id);

            // If user is already attending
            if (isAttending) {
                return res.status(400).json({ 
                    success: false,
                    status: 400, 
                    message: 'You are already attending this activity.' 
                });
            }

            activity.attendees.push(req.session.user);
            await activity.save();
            // TODO: We should send back the nickname
            res.send({ user: req.session.user.email});
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
