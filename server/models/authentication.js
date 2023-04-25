
const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        // If the user is authenticated, proceed with the request
        return next();
    } else {
        // If the user is not authenticated, redirect to the login page
        return res.redirect('/login');
    }
}

module.exports = { requireAuth };