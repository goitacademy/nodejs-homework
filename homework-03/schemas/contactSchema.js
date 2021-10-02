const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  phone: Joi.string().min(5).max(20).required(),
  email: Joi.string().email(),
});

module.exports = contactSchema;
