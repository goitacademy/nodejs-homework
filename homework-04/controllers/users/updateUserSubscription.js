const { NotFound } = require('http-errors');

const { sendSuccessRes } = require('../../utils');
const { User } = require('../../models/users');

const updateUserSubscription = async (req, res, _next) => {
	const usertoken = req.rawHeaders[1].split(' ')[1];
	// console.log(usertoken);
	if (!usertoken) {
		throw new NotFound('Current user is not found');
	}

	const { subscription } = req.body;

	let currentUser = await User.findOneAndUpdate(
		{ token: usertoken },
		{ subscription },
		{
			new: true,
		},
	);

	sendSuccessRes(res, { currentUser });
};

module.exports = updateUserSubscription;
