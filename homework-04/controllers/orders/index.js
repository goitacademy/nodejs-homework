const addOrder = require('./addOrder');
const getAllOrdersByUser = require('./getAllOrdersByUser');
const getAllOrders = require('./getAllOrders');

const orders = {
	addOrder,
	getAllOrdersByUser,
	getAllOrders,
};
module.exports = {
	orders,
};
