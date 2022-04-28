const rateLimit = require('express-rate-limit');
const { TIME_FRAME_IN_S, RPS_LIMIT } = require('../utils/constants/rate-limiting-const')

const rateLimiter = rateLimit({
  windowMs: TIME_FRAME_IN_S,
  max: RPS_LIMIT,
  headers: true,
});

module.exports = {
  rateLimiter
}