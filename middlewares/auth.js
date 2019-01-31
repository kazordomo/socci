// TODO: handle the error
function requiresLoginMw (req, res, next) {

    if (req.session && req.session.user._id) {
        return next();
    }

    const err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);

}

module.exports = {
    requiresLoginMw,
}