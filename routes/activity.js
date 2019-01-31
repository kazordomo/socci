const mongoose = require('mongoose');
const Activity = mongoose.model('activity');
const User = mongoose.model('user');
const path = require('path');
const { requiresLoginMw } = require('../middlewares/auth');
const { flatCache, cacheMw } = require('../middlewares/cache');
const cache = flatCache.load('activitiesCache', path.resolve('./caches'));

module.exports = app => {

    app.get('/api/activity/:id', requiresLoginMw, async (req, res) => {
        try {
            const activity = await Activity.findOne({ _id: req.params.id });
            res.send(activity);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    
    // TODO: use this in production - get all relevant activities.
    // app.get('/api/activites', requiresLoginMw, cacheMw(cache), async (req, res) => {
    //     const user = await User.findById(req.session.user._id);
    //     const activities = await Activity.find({ '_user': { $in: [
    //         ...user.friends
    //     ]}}).sort('-createdAt');
    //     // Use this to send the users created activities as well. rse.send({ userAc..., activities })
    //     const userActivities = await Activity.find({ '_user': req.session.user._id });
    //     res.send(activities);
    // });

    // TODO: use this to get ALL activities.
    app.get('/api/activites', requiresLoginMw, cacheMw(cache), async (req, res) => {
        const activities = await Activity.find({});
        res.send(activities);
    });
    
    app.post('/api/activity', async (req, res) => {
        const user = await User.findById(req.session.user._id);
        const { title, information, time, attendees } = req.body;

        let friends = await User.find({ '_id': { $in: [
            ...user.friends
        ]}}).sort('email');

        // If the attendee specified is a friend, return the friend obj.
        objectifiedAttendees = attendees.map(attendee => {
            let friend = friends.find(friend => friend.nickname.toLowerCase() === attendee.toLowerCase());
            if(friend) {
                return friend;
            } else {
                return { nickname: attendee }
            }
        });

        let newActivity = new Activity({
            title,
            information: information ? information : '',
            time,
            attendees: objectifiedAttendees,
            _user: req.session.user._id
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
            res.send({ user: req.session.user.nickname});
        } catch (err) {
            res.status(400).json(err);
        }
    });
    
    app.post('/api/activity/decline/:id', async (req, res) => {
        try {
            let activity = await Activity.findOne({ _id: req.params.id });
            let attendee = activity.attendees.find(attendee => attendee.id === req.body.userId);
            activity.attendees.splice(activity.attendees.indexOf(attendee), 1);
            await activity.save();
            res.send(activity);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    
    app.post('/api/activity/comment/:activityId', async (req, res) => {
        try {
            let activity = await Activity.findOne({ _id: req.params.activityId });
            let comment = { 
                _id: activity.comments.length, 
                user: req.session.user.nickname, 
                comment: req.body.comment 
            };
            activity.comments.push(comment);
            await activity.save();
            res.send(comment);
        } catch (err) {
            res.status(400).json(err);
        }
    });

    app.delete('/api/activity/comment/:activityId/:id', async (req, res) => {
        try {
            let activity = await Activity.findOne({ _id: req.params.activityId });
            let comment = activity.comments.find(comment => comment.id === req.params.commentId);
            activity.comments.splice(activity.comments.indexOf(comment), 1);
            await activity.save();
            res.send(activity);
        } catch (err) {
            res.status(400).json(err);
        }
    })

}
