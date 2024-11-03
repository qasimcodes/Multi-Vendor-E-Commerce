import express from "express";
const orderRoutes = express.Router();
import { requiredLoggedIn, checkAdmin} from '../middlewares/authMiddleware.js';

import * as order from "../controllers/orders.js";

orderRoutes.route('/:id').get(requiredLoggedIn, order.fetchUserOrders);
orderRoutes.route('/').get(requiredLoggedIn, checkAdmin, order.fetchOrders);
orderRoutes.route('/:id').put(requiredLoggedIn, checkAdmin, order.setDelivered);
orderRoutes.route('/:id').delete(requiredLoggedIn, checkAdmin, order.deleteOrder);
 
export default orderRoutes;