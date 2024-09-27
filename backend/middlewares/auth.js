const jwt = require('jsonwebtoken');

const JWT_SECRET = "deals_dray";

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Invalid token.');
    }
};

module.exports = authenticateJWT;
