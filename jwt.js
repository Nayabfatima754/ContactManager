const jwt = require('jsonwebtoken');

// Middleware for token validation
const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: 'Token not found' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded.user; // Assuming the payload contains the user data

        // Log the decoded user information (optional, for debugging)
        console.log('Decoded user information:', req.user);

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = jwtAuthMiddleware;
