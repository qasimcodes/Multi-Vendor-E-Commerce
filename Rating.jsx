import React from 'react'
import { IoStar } from "react-icons/io5";

const Rating = ({product, ratingWidth}) => {
  return (
    <div className="flex">
    {[...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`h-5 ${ratingWidth} ${index < product.rating ? 'text-yellow-500' : 'text-gray-400'}`}
        viewBox="0 0 20 20" >
         <IoStar className='hover:text-yellow-600' />
      </svg>
    ))}
  </div>
  )
}

export default Rating
