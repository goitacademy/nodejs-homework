const { Order } = require('../../models/order');

const getAllOrdersByUser = async (req, res) => {
	const { _id } = req.user;
	const result = await Order.find({ owner: _id }, '_id content owner');
	res.json({
		status: 'success',
		code: 200,
		data: {
			result,
		},
	});
};

module.exports = getAllOrdersByUser;
