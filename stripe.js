import express from 'express';
const stripeRoute = express.Router();
import { requiredLoggedIn } from '../middlewares/authMiddleware.js';

import * as stripe from "../controllers/stripe.js";

stripeRoute.route('/').post(requiredLoggedIn, stripe.stripePayment);

export default stripeRoute;