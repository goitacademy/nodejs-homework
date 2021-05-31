const Joi = require('joi');
const { HttpCode, Subscription } = require('../helpers/constants');

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email()
    .pattern(/\S+@\S+\.\S+/)
    .required(),
  password: Joi.string().required(),
});

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string().valid(Subscription.STARTER, Subscription.BUSINESS, Subscription.PRO),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.createUser = (req, _res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

module.exports.updateSubscription = (req, _res, next) => {
  return validate(schemaUpdateSubscription, req.body, next);
};
