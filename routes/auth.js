const User = require('../models/user');

module.exports = app => {

    app.get('/auth/user', (req, res) => {
        res.send({'GET': 'LOGIN'});
    });

    app.post('/auth/login', async (req, res) => {
        try {
            let user = await User.findOne({ 'email': req.body.email });

            if(!user) {
                return res.status(404).json({
                    success: false,
                    status: 404,
                    message: 'The user does not exist.'
                });
            }
            if(!user.validPassword(req.body.password, user.password)) {
                return res.status(404).json({
                    success: false,
                    status: 404,
                    message: 'Incorrect password.'
                });
            }

            req.session.user = user;
            res.send(user);

        } catch (err) {
            res.status(404).json({
                success: false,
                status: 404,
                message: 'Incorrect email or password.'
            });
        }
    });

    app.post('/auth/register', async (req, res) => {
        let user = await User.findOne({ email: req.body.email });

        if(user) {
            res.status(404).json({
                success: false,
                status: 404,
                message: 'The email provided is already in use.'
            });
        }
        if(req.body.password !== req.body.retype_password) {
            res.status(404).json({
                success: false,
                status: 404,
                message: 'The passwords does not match.'
            });
        }

        try {
            let newUser = new User();
            newUser.email = req.body.email;
            newUser.password = newUser.generateHash(req.body.password);

            await newUser.save();

            req.session.user = user;
            res.send(newUser);
        } catch (err) {
            res.status(400).json(err);
        }
    });

    app.get('/auth/logout', (req, res) => {
        if (req.session) {
            req.session.destroy(err => {
                if(err) {
                    resstatus(404).json({ 
                        success: false, 
                        status: 404, 
                        message: 'Could not logout'
                    });
                } else {
                    res.status(200);
                }
            });
        }
    });

    app.delete('/auth/user', (req, res) => {
        res.send({'DELETE': 'LOGIN'});
    });
    
}