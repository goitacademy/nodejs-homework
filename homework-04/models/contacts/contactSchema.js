const { Schema, model } = require('mongoose');
const Joi = require('joi');

const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

const emailRegexp =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const nameRegexp =
	/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;

const mongoContactSchema = Schema(
	{
		name: {
			type: String,
			required: [true, "Ім'я людини не вказано"],
			match: nameRegexp,
		},
		email: {
			type: String,
			required: [true, 'Пошта людини не вказано'],
			unique: true,
			match: emailRegexp,
		},
		phone: {
			type: String,
			required: [true, 'Номер людини не вказано'],
			unique: true,
			match: phoneRegexp,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true },
);

const updateFavoriteContactJoiSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const joiContactSchema = Joi.object({
	name: Joi.string().pattern(nameRegexp).required(),
	email: Joi.string().pattern(emailRegexp).required(),
	phone: Joi.string().pattern(phoneRegexp).required(),
	favorite: Joi.boolean(),
});

const Contact = model('contact', mongoContactSchema);

module.exports = {
	joiContactSchema,
	updateFavoriteContactJoiSchema,
	Contact,
};
