const { Conflict } = require('http-errors');
// const bcrypt = require('bcryptjs');

const { User } = require('../../models/users');

const signup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw new Conflict('Email in use');
	}
	const newUser = new User({ email });
	newUser.setPassword(password);
	await newUser.save();
	console.log(newUser);
	// const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	// const newUser = { email, password: hashPassword };
	// const result = await User.create(newUser);
	res.status(201).json({
		status: 'Created',
		code: 201,
		message: 'Success register',
		responseBody: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

module.exports = signup;
