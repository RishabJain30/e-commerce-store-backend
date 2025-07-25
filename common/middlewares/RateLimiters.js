const rateLimit = require('express-rate-limit');

const createRateLimiter = (options = {}) => {
    return rateLimit({
        windowMs: options.windowMs || 60 * 1000, 
        max: options.max || 5,
        message: options.message || {
            status: false,
            error: {
                message: "Too many requests, please try again later."
            }
        },
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: options.keyGenerator,
    });
};

const productRateLimiter = createRateLimiter({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        status: false,
        error: {
            message: "You've hit the limit, please wait a minute."
        }
    }
});

module.exports = {
    productRateLimiter,
    createRateLimiter,
};