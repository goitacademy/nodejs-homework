const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');

const { User } = require('../../models/auth');

const signup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw new Conflict('Alredy register');
	}
	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const newUser = { email, password: hashPassword };
	const result = await User.create(newUser);
	res.status(201).json({
		status: 'success',
		code: 201,
		message: 'Success register',
	});
};

module.exports = signup;
