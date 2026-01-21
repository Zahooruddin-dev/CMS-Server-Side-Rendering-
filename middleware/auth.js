const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        req.flash('error', 'Please login to access this page');
        return res.redirect('/auth/login');
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        req.flash('error', 'Invalid token');
        res.redirect('/auth/login');
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        req.flash('error', 'Admin access required');
        res.redirect('/');
    }
};

module.exports = { authMiddleware, adminMiddleware };