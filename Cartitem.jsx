import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addCartItem, removeCartItem } from '../redux/actions/cartActions';

const CartItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id, brand, category } = cartItem;
  const dispatch = useDispatch();
  
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleIncrement = () => {
    if (qty < stock) {
      dispatch(addCartItem(id, qty + 1)); 
      setErrorMessage(''); 
      setShowError(false);
    } else {
      setErrorMessage('Cannot add more than available stock!');
      setShowError(true);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      dispatch(addCartItem(id, qty - 1)); 
    } else {
      dispatch(removeCartItem(id)); 
    }
    setErrorMessage(''); 
    setShowError(false);
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  return (
    <div className='flex flex-col items-center justify-between border-b pb-4 mb-4'>
      <div className="flex items-center justify-between w-full">
        <Link to={`/product/${id}`}>
          <img src={image} alt={name} className='w-20 h-20 rounded-lg object-cover' />
        </Link>

        <div className='flex-1 ml-4'>
          <Link to={`/product/${id}`}>
            <h3 className='text-normal font-semibold dark:text-purple-900'>
              {brand} {name}
            </h3>
          </Link>
          <p className='text-gray-600 dark:text-purple-900'>{category}</p>
        </div>

        <div className='text-sm font-bold italic text-blue-600 mx-2 dark:text-orange-500'>
          Rs.{price.toFixed(2)} <span className='text-gray-600'>x {qty}</span>
        </div>

        <div className='flex items-center'>
          <button
            onClick={handleDecrement}
            className='px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition'>
            -
          </button>
          <span className='px-4'>{qty}</span>
          <button
            onClick={handleIncrement}
            className='px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition'>
            +
          </button>
        </div>

        <div className='text-sm font-bold italic text-blue-600 dark:text-orange-500 mx-2'>
          Rs.{(price * qty).toFixed(2)}
        </div>
      </div>

      {errorMessage && showError && (
        <div className={`mt-2 text-red-600 text-sm font-semibold transition-opacity duration-500 ease-out ${!showError ? 'opacity-0' : 'opacity-100'}`}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default CartItem;
