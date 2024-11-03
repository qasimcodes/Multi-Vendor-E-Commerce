import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { addCommas, saleCalc } from '../functions/func';
import { addToFavorites, removeFromFavorites } from '../redux/actions/productActions';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem } from '../redux/actions/cartActions';
import { FaCartPlus } from 'react-icons/fa6';
import { cartToast } from '../functions/toastify';
import { motion } from 'framer-motion';

const ProductCard = ({ product, isLoading }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.product);
  const [cartPlusDisabled, setCartPlusDisabled] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const item = cartItems.find((cartItem) => cartItem.id === product?._id);
    if (item && item.qty === product?.stock) {
      setCartPlusDisabled(true);
    }
  }, [product, cartItems]);

  const addItem = (id) => {
    if (cartItems.some((cartItem) => cartItem.id === id)) {
      const item = cartItems.find((cartItem) => cartItem.id === id);
      dispatch(addCartItem(id, item.qty + 1));
    } else {
      dispatch(addCartItem(id, 1));
    }
    cartToast('🏬 Item has been added to the cart');
  };

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <motion.div
      className="bg-black dark:bg-gray-900 dark:hover:bg-indigo-900 hover:bg-purple-800 transition duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto"
      initial={{ opacity: 0, y: 25 }}  
      animate={{ opacity: 1, y: 0 }}    
      exit={{ opacity: 0, y: 25 }}      
      transition={{ duration: 1 }}     
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden myCard">
          <img
            className="object-cover hover:animate-spin object-center w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
            src={product.images[0]}
            alt={product.title}
          />
        </div>
      </Link>
      <div className="p-3">
        <h2 className="text-white text-center font-bold text-lg transition duration-300 ease-in-out hover:text-orange-400 dark:text-gray-100 dark:hover:text-white">
          <Link to={`/product/${product._id}`}>{product.title}</Link>
          <span className="ml-6">
            {favorites.includes(product._id) ? (
              <button onClick={() => dispatch(removeFromFavorites(product._id))}>
                <MdOutlineFavorite className="heart1 animate-pulse hover:animate-bounce" />
              </button>
            ) : (
              <button onClick={() => dispatch(addToFavorites(product._id))}>
                <MdOutlineFavoriteBorder className="hover:animate-bounce" />
              </button>
            )}
          </span>
        </h2>

        <div className="flex justify-between text-gray-400 text-sm font-bold mt-1">
          <span className="transition duration-300 ease-in-out hover:text-orange-400">
            {product.brand}
          </span>
          <span className="transition duration-300 ease-in-out hover:text-orange-400">
            {product.category}
          </span>
        </div>

        <div className="flex justify-between mt-3">
          <Rating product={product} ratingWidth="w-4" />
          <span className="text-red-500 hover:text-red-700 font-bold text-sm">
            Rs.{' '}
            {addCommas(saleCalc(product.price, product.onSale, product.discount))}
          </span>
        </div>

        <div className="flex justify-between mt-2">
          <Link
            to={`/product/${product._id}`}
            className="w-30 h-12 bg-purple-600 text-white font-bold p-3 rounded hover:bg-black transition duration-300 ease-in-out mt-2 dark:bg-indigo-900 dark:hover:bg-indigo-800"
          >
            View Details
          </Link>
          <button
            disabled={product.stock <= 0}
            title={product.stock <= 0 && 'Out of stock'}
            onClick={() => addItem(product._id)}
          >
            <FaCartPlus className="pt-4 w-10 h-12 text-white hover:text-red-200 animate-pulse hover:animate-bounce dark:text-red-700 dark:hover:text-yellow-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
