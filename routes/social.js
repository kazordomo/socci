const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = app => { 

    app.get('/api/social/friends', async (req, res) => {
        const user = await User.findById(req.session.user._id);
        let friends = await User.find({ '_id': { $in: [
            ...user.friends
        ]}}).sort('email');
        friends.map(friend => { return { id: friend.id, email: friend.email } });
        res.send(friends.map(friend => { return { id: friend.id, email: friend.email } }));
    });

    app.get('/api/social/add/:user', async (req, res) => {
        try {
            const user = await User.findById(req.session.user._id);
            const addUser = await User.findOne({$or: [
                { email: req.params.user },
                { phone: req.params.user }
            ]});

            // Check if the user is trying to add him/herself.
            if (user._id.equals(addUser._id)) {
                return res.status(400).json({ success: false, status: 400, message: 'You can not add yourself.'});
            }
            // Check if the users are already friends.
            if (user.friends.find(u => u._id.equals(addUser._id))) {
                return res.status(400).json({ success: false, status: 400, message: 'You are already friends!'});
            }
            // Check if no user (addUser) is specified
            if (!addUser) {
                return res.status(400).json({ success: false, status: 404, message: 'No user found'});
            }

            user.friends.push(addUser);
            user.save();
            res.send({ email: addUser.email });
        } catch (err) {
            console.log(err);
            res.status(400).json({ success: false, status: 400, message: err });
        }
    });

}