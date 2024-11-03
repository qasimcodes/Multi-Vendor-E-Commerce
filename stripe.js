import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';
import Order from '../models/orders.js';
import Product from '../models/products.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  export const stripePayment = async (req, res) => {
    const data = req.body;
    console.log(data);
  
    let lineItems = [];
  
    if (data.shipping == 300.99) {
      lineItems.push({
        price: process.env.EXPRESS_SHIPPING_ID,
        quantity: 1,
      });
    } else {
      lineItems.push({
        price: process.env.STANDARD_SHIPPING_ID,
        quantity: 1,
      });
    }
  
    data.cartItems.forEach((item) => {
      lineItems.push({
        price: item.stripeId,
        quantity: item.qty,
      });
    });
  
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });
  
    const order = new Order({
      orderItems: data.cartItems,
      user: data.userInfo._id,
      username: data.userInfo.name,
      email: data.userInfo.email,
      shippingAddress: data.shippingAddress,
      shippingPrice: data.shipping,
      subtotal: data.subtotal,
      totalPrice: Number(data.subtotal + data.shipping).toFixed(2),
    });
  
    const newOrder = await order.save();
  
    data.cartItems.forEach(async (cartItem) => {
      let product = await Product.findById(cartItem.id);
      product.stock = product.stock - cartItem.qty;
      product.save();
    });
  
    res.send(
      JSON.stringify({
        orderId: newOrder._id.toString(),
        url: session.url,
      })
    );
  };