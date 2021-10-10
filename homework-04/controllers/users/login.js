const { BadRequest, NotFound } = require('http-errors');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/users');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email }, '_id email password subscription');
	if (!user || !user.comparePassword(password)) {
		throw new BadRequest('Email or password is wrong');
	}
	// if (!user) {
	// 	throw new NotFound(`Email ${email} not found`);
	// res.status(404).json({
	//     status: "error",
	//     code: 404,
	//     message: `Email ${email} not found`
	// });
	// return;
	// }
	// if (!user.comparePassword(password)) {
	// 	throw new BadRequest('Invalid password');
	// }
	// if (!bcrypt.compareSync(password, user.password)) {
	// 	throw new BadRequest('Invalid password');
	// res.status(400).json({
	//     status: "error",
	//     code: 400,
	//     message: "Invalid password"
	// });
	// return;
	// }
	const payload = {
		_id: user._id,
	};
	const token = jwt.sign(payload, SECRET_KEY);
	// const token = jwt.sign(payload, SECRET_KEY);
	await User.findByIdAndUpdate(user._id, { token });
	console.log(user);
	res.json({
		status: 'success',
		code: 200,
		token: token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});

	// const token = user.createToken();
};

module.exports = login;
