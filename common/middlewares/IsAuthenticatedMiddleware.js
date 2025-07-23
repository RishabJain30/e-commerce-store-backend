const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

module.exports = {
    check: (req, res, next) => {
        const authHeader = req.headers['authorization'];

        if(!authHeader){
            return res.status(401).json({
                status: false,
                error: {
                    message: 'Authorization header not found'
                }
            });
        }

        if(!authHeader.startsWith('Bearer')){
            return res.status(401).json({
                status: false,
                error: {
                    message: 'Invalid authorization format'
                }
            });
        }

        const token = authHeader.split(' ')[1];

        if(!token){
            return res.status(401).json({
                status: false,
                error: {
                    message: 'Bearer token missing in the authorization headers.'
                }
            });
        }

        jwt.verify(token, jwtSecret, (err, user) => {
            if(err){
                return res.status(403).json({
                    status: false,
                    error: 'Invalid access token. Please login again.'
                });
            }

            req.user = user; // Save the user object for further use
            next(); // Call the next middleware or route handler
        });
    }
}