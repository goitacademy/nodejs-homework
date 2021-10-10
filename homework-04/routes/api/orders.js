const express = require('express');

const { JoiOrderSchema } = require('../../models/order/order');
const {
	controllerWrapper,
	validation,
	authenticate,
} = require('../../middlewares');
const { orders: ctrl } = require('../../controllers/orders');

const router = express.Router();

router.post(
	'/',
	authenticate,
	validation(JoiOrderSchema),
	controllerWrapper(ctrl.addOrder),
);

router.get('/all', controllerWrapper(ctrl.getAllOrdersByUser));

router.get('/', authenticate, controllerWrapper(ctrl.getAllByUser));

module.exports = router;
