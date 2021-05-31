const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  handler: (req, res) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'исчерпан лимит создания аккаунтов за 1 час',
    });
  },
});
module.exports = { createAccountLimiter };
