// TODO: handle the error
function requiresLogin (req, res, next) {

    if (req.session && req.session.user._id) {
        return next();
    }

    const err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);

}

module.exports = {
    requiresLogin,
}