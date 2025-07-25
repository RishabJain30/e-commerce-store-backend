const redis = require("../redis");

/**
 * Custom Redis-backed rate limiter
 * @param {Object} config
 * @param {number} config.limit - Max number of allowed requests
 * @param {number} config.windowSeconds - Time window in seconds
 * @param {function} [config.keyGenerator] - Function to identify the user (e.g. req.user.id or req.ip)
 */
const customRateLimiter = ({limit = 5, windowSeconds = 60, keyGenerator}) => {
    return async (req, res, next) => {
        try{
            const identifier = keyGenerator ? keyGenerator(req) : req.ip;
            const routeKey = req.originalUrl;
            const redisKey = `rate_limit:${identifier}:${routeKey}`;

            const currentCount = await redis.incr(redisKey);
            if (currentCount === 1) {
                await redis.expire(redisKey, windowSeconds);
            }
            console.log("🔑 Redis Key:", redisKey);
            if(currentCount > limit){
                const ttl = await redis.ttl(redisKey);
                return res.status(429).json({
                    status: false,
                    error: {
                        message: `Rate limit exceeded. Try again in ${ttl} seconds.`
                    }
                });
            }
            return next();
        }
        catch(err){
            console.error("Rate limiter error:", err);
            return res.status(500).json({
                status: false,
                error: {
                    message: "Internal server error"
                }
            });
        }
    };
};

module.exports = customRateLimiter;