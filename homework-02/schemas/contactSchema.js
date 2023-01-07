const Joi = require("joi")

const contactSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required()
})

module.exports = contactSchema