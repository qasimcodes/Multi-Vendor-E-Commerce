import React, { useState } from 'react';
import MyImageGallery from './ImageGallery';
import { FaPlus, FaMinus } from 'react-icons/fa';
import Rating from './Rating';
import PriceComponent from './PriceComponent';
import {useDispatch, useSelector} from 'react-redux';
import { addCartItem } from '../redux/actions/cartActions';
import { cartToast  } from '../functions/toastify'


const ProductDetails = ({ product }) => {
  const [amount, setAmount] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');
	const [rating, setRating] = useState(1);
	const [title, setTitle] = useState('');
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  
  const changeAmount = (input) => {
    if (input === "plus") {
      setAmount(amount + 1);
    }
    if (input === "minus") {
      setAmount(amount - 1);
    }
  };

  const addItem = (id) => {
		if (cartItems.some((cartItem) => cartItem.id === id)) {
			const item = cartItems.find((cartItem) => cartItem.id === id);
			dispatch(addCartItem(id, item.qty + 1));
		} else {
			dispatch(addCartItem(id, 1));
		}
		cartToast('🏬 Item has been added in cart')
	};   


  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <MyImageGallery images={product.images} />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-4xl text-gray-800 dark:text-gray-200 capitalize font-bold">{product.title}
            &nbsp;
            <sup className="text-orange-600 text-base font-bold">
             {product.productIsNew && "(New Arrival)"}
            </sup>
            </h1>
          <h1 className="text-3xl text-gray-600 dark:text-gray-200">
            {(product.brand.toUpperCase())}
            </h1>
          <div className="border-t"></div>
          <div className="flex items-center my-3">
            <div className="flex text-purple-500">
                 <Rating product={product} ratingWidth="w-6" />
            </div>
            <p className="ml-2 dark:text-yellow-500 text-gray-600">({product.reviews} reviews)</p>
          </div>
         <PriceComponent product={product} />
          <p className="my-2"> 
             <span className='font-semibold text-[18px]'>
               {product.category == "Electronics" || 
               product.category == "Laptops" || 
               product.category == "Mobiles" || 
               product.category == "Gaming Console" ||
               product.category == "Accessories"
               ? <span className="dark:text-gray-200 text-gray-800"> Specifications: </span>
                :  <span className='dark:text-gray-200 text-gray-800'> Small Details: </span>  }   
              </span>
             </p><p className='dark:text-yellow-500 text-gray-800'>{product.subtitle}</p>
             <div className="border-t"></div>
          <p className="my-2">
            {product.inStock ? 
              <>
               <span className="text-green-600 font-bold"> 
                   In Stock:  
               </span> 
               { 
                (product.stock == 1) ? 
                   <span className="text-red-800 dark:text-red-300"> only {product.stock}  Item left </span> 
                   : (product.stock > 1 && product.stock <= 10) ? 
                   <span className="text-purple-800 dark:text-purple-300"> only {product.stock}  Items left </span> 
                   : ((product.stock >=  11 ) ) ? 
                   <span className="text-gray-800 dark:text-gray-300"> {product.stock}  Items left </span> 
                   : null
               }
              </> 
                : 
               <span className="text-red-600 font-bold"> 
               Out of Stock
           </span>  }  
          </p>
          <p className="my-2 dark:text-yellow-500 text-gray-800"> <span className='font-semibold text-[18px] dark:text-gray-200 text-gray-800'> Category: </span>
              {product.category}   </p>
          <div className="flex items-center my-2 ">
            <div className="flex items-center ml-4">
              <button
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-l"
                isDisabled={amount <= 1} onClick={() => changeAmount("minus")}>
                <FaMinus />
              </button>
              <div className="bg-gray-100 dark:bg-yellow-400 dark:text-white text-gray-700 py-1 px-4">{amount}</div>
              <button
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-r"
                isDisabled={amount >= product.stock} onClick={() => changeAmount("plus")}>
                <FaPlus />
              </button>
            </div>
          </div>
          <button disabled={product.sold}
              className={`${product.sold ? "bg-slate-950 hover:bg-slate-900": "  bg-purple-500"  }  text-white py-2 px-7 ml-4 rounded hover:bg-purple-600`}
              onClick={() => addItem()}>
              Add to Cart
            </button>
          <div className="mt-4">
            <h2 className="text-xl font-bold dark:text-gray-200 text-gray-800">Full Description</h2>
            <p className="dark:text-gray-200 text-gray-800">{product.fullDetails}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold dark:text-gray-200 text-gray-800">Reviews</h2>
          
            {product.comments.map((comment, index) => (

              <div key={index} className="border-t py-2">
                  <p className='text-purple-600 font-semibold'>{comment.user}</p>
                  <small className='float-right text-sm text-slate-500'>
                  {comment.time} </small>
              
                  <Rating className="dark:text-gray-200 text-gray-800" product={comment} ratingWidth="w-4" />
            

                <p>{comment.text}</p>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;