import Order from '../models/orders.js';
import asyncHandler from 'express-async-handler';


const fetchUserOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.params.id });
	if (orders) {
		res.json(orders);
	} else {
		res.json({ error: 'No orders could be found.' });
		throw new Error('No Orders found.');
	}

});

const fetchOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({});
	res.json(orders);
});

const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findByIdAndDelete(req.params.id);
	if (order) {
		res.json(order);
	} else {
		res.send('Order not found.');
		throw new Error('Order not found.');
	}
});

const setDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.send('Order could not be uploaded.');
		throw new Error('Order could not be updated.');
	}
});

export { 
    fetchUserOrders,
	fetchOrders,
	deleteOrder,
	setDelivered
};