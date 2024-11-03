import React from 'react';
import { PiCurrencyDollar } from "react-icons/pi";

const PriceComponent = ({product}) => {
  return (
    <>    { product.onSale ? 
           <p className="font-bold text-2xl text-red-600 leading-6 mr-2"> 
              Rs.  {product.salePrice} 
              <small className="font-semibold text-purple-600 ml-4"> 
              {product.dollarSale}  <PiCurrencyDollar style={{ 
                display: "inline",
                marginLeft: "-10px",
                 }} />  
              </small>
              <br />
              <small className="font-semibold line-through text-gray-400">Rs. {product.price}</small> <small className="font-semibold dark:text-yellow-500 text-gray-700 ">
                  -{product.discount}%
              </small>
           </p> :  <p className="font-bold text-2xl text-red-600"> 
              Rs.  {product.price}  
              <small className="font-semibold text-purple-600 ml-4"> 
              {product.dollar}  <PiCurrencyDollar style={{ 
                display: "inline",
                marginLeft: "-10px",
                 }} />  
              </small>
              {product.sold && <sup className='font-semibold text-base text-orange-600 '> (Sold) </sup>}            
           </p> 
}
    </>
  )
}

export default PriceComponent
