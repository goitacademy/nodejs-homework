const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const userSchema = Schema(
	{
		email: {
			type: String,
			required: [true, 'Email is required'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			minlength: 6,
		},
		subscription: {
			type: String,
			enum: ['starter', 'pro', 'business'],
			default: 'starter',
		},
		token: {
			type: String,
			default: null,
		},
	},
	{ versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = function (password) {
	this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const { SECRET_KEY } = process.env;

userSchema.methods.createToken = function () {
	const payload = {
		_id: this._id,
	};
	return jwt.sign(payload, SECRET_KEY);
};

const joiSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().min(6).required(),
});

const updateUserSubscription = Joi.object({
	subscription: Joi.string().required().valid('starter', 'pro', 'business'),
});

const User = model('user', userSchema);

module.exports = {
	User,
	joiSchema,
	updateUserSubscription,
};
