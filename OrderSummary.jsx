import React, { useState } from "react";
import { FaTruck, FaBox } from "react-icons/fa";

const OrderSummary = ({ subtotal }) => {
  // Default standard shipping is applied
  const [shipping, setShipping] = useState(300);

  // Logic to make shipping free if subtotal is greater than Rs10,000
  const effectiveShipping = subtotal > 10000 ? 0 : shipping;

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 dark:text-purple-800'>Order Summary</h2>

      {/* Subtotal */}
      <div className='flex justify-between mb-4'>
        <span className='font-semibold'>Subtotal</span>
        <span className='font-bold italic text-blue-600 dark:text-orange-600'>
          Rs.{subtotal.toFixed(2)}
        </span>
      </div>

      {/* Shipping */}
      {subtotal <= 10000 && (
        <div className='mb-4'>
          <h3 className='font-semibold mb-2'>Shipping</h3>
          <div className='space-y-2'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='shipping'
                value={300}
                checked={shipping === 300}  // Default to standard shipping
                onChange={() => setShipping(300)}
                className='mr-2'
              />
              <span className='flex items-center'>
                <FaTruck className='mr-2 text-gray-500' /> Standard Shipping (Rs.300.00)
              </span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='shipping'
                value={600}
                checked={shipping === 600}
                onChange={() => setShipping(600)}
                className='mr-2'
              />
              <span className='flex items-center'>
                <FaBox className='mr-2 text-gray-500' /> Express Shipping (Rs.600.00)
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Total */}
      <div className='flex justify-between mt-4'>
        <span className='font-extrabold text-red-600'>Total</span>
        <span className='font-bold italic text-blue-600 dark:text-orange-600 text-xl'>
          Rs.{(subtotal + effectiveShipping).toFixed(2)}
        </span>
      </div>

      {/* Proceed to Checkout Button */}
      <button className='w-full mt-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300'>
        Proceed to Checkout
      </button>

      {/* Free Shipping Notification */}
      {subtotal > 10000 && (
        <p className='text-purple-800 mt-4 font-semibold'>
          Your Total Amount is more than 10,000 Rs, So enjoy free shipping 😇
        </p>
      )}
    </div>
  );
};

export default OrderSummary;
