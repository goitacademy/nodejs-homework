const { NotFound } = require('http-errors');
const { sendSuccessRes } = require('../../utils');

const { User } = require('../../models/users');

const getAllOrdersByUser = async (req, res) => {
	const usertoken = req.rawHeaders[1].split(' ')[1];
	// console.log(usertoken)
	if (!usertoken) {
		throw new NotFound('Current user is not found');
	}
	const currentUser = await User.find({ token: usertoken });
	// console.log(currentUser);
	const { _id, email, subscription, password, token } = currentUser[0];
	sendSuccessRes(res, { _id, email, subscription, password, token }, 200);
};

module.exports = getAllOrdersByUser;
