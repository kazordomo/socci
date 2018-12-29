const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = app => { 

    app.get('/api/social/add/:email', async (req, res) => {
        try {
            //TODO: we need to check if the user is already in the friends list or not.
            const user = await User.findOne({ email: req.params.email });
            if (user) {
                res.send(user);
            } else {
                res.status(400).json({status: 404, message: 'No user found'});
            }

        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    });

}