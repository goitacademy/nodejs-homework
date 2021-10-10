const { Order } = require('../../models/order');

const addOrder = async (req, res) => {
	const newOrder = { ...req.body, owner: req.user._id };
	const result = await Order.create(newOrder);
	res.status(201).json({
		status: 'success',
		code: 201,
		data: {
			_id: result._id,
			content: result.content,
			owner: result.owner,
		},
	});
};

module.exports = addOrder;
