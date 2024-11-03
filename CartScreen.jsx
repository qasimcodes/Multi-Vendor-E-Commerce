import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImCart } from "react-icons/im";
import { TbTrashXFilled } from "react-icons/tb";
import CartItem from "../layouts/Cartitem";
import OrderSummary from "../layouts/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  const { loading, error, cartItems, subtotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const updateQuantity = (id, value) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: Math.max(1, item.qty + value) };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const clearCart = () => dispatch(resetCart());

  return (
    <>
      <div className='p-8 bg-gray-100 dark:bg-slate-900 dark:hover:bg-gray-900 min-h-screen'>
        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <div className='max-w-6xl mx-auto grid lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 bg-white p-6 rounded-lg shadow-lg'>
              <h2 className='text-xl font-mono font-bold mb-4 dark:text-purple-700'>
                You have {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart.
              </h2>
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className='mt-6 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center text-sm'>
                Clear Cart
                <TbTrashXFilled className='ml-2' />
              </button>
            </div>

            {/* Order Summary */}
            <OrderSummary subtotal={subtotal} />
          </div>
        ) : (
          // Empty cart message
          <div className='text-center mt-16'>
            <ImCart className='text-6xl text-red-500 mx-auto mb-4' />
            <h2 className='text-3xl font-bold text-red-500 mb-4'>Your cart is empty</h2>
            <Link to='/' className='dark:text-white text-purple-800 hover:underline font-bold'>
              Go to product page to add new items
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartScreen;
