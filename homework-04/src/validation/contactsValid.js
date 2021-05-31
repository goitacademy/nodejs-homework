const Joi = require('joi');
const { HttpCode } = require('../helpers/constants');

const schemaCreateCotact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().pattern(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$')).required(),
  features: Joi.array().optional(),
  favorite: Joi.boolean().optional(),
  owner: Joi.object().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
});

const schemaUpdateCotact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.string().pattern(new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$')).optional(),
  features: Joi.array().optional(),
  favorite: Joi.boolean().optional(),
  owner: Joi.object().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
});

const schemaUpdateStatusCotact = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = (shema, body, next) => {
  const { error } = shema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      code: HttpCode.BAD_REQUEST,
      message: `Field ${message.replace(/"/g, '')}`,
      data: 'Bad request',
    });
  }
  next();
};
const validateStatus = (shema, body, next) => {
  const { error } = shema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      code: HttpCode.BAD_REQUEST,
      message: `missing field ${message.replace(/"/g, '')}`,
      data: 'Bad request',
    });
  }
  next();
};

module.exports.validateCreateCotact = (req, res, next) => {
  return validate(schemaCreateCotact, req.body, next);
};

module.exports.validateUpdateCotact = (req, _res, next) => {
  return validate(schemaUpdateCotact, req.body, next);
};

module.exports.validateUpdateStatusCotact = (req, _res, next) => {
  return validateStatus(schemaUpdateStatusCotact, req.body, next);
};
