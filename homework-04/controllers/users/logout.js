const jwt = require('jsonwebtoken');

const { User } = require('../../models/users');

const { SECRET_KEY } = process.env;

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: null });
	res.json({
		status: 'success',
		code: 204,
		message: 'Success logout',
	});
};

module.exports = logout;
