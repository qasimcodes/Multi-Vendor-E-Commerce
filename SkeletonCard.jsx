import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-gray-900 animate-pulse rounded-lg shadow-lg max-w-sm mx-auto overflow-hidden">
      <div className="h-70 bg-gray-700 rounded-t-lg"></div>
      <div className="p-8">
        <div className="h-12 bg-gray-700 rounded mb-4 w-3/4 animate-pulse text-orange-500">
            Product Loading</div>
        <div className="h-8 bg-gray-700 rounded pl-6 mb-3 w-3/4 text-gray-100">image</div>
        <div className="h-6 bg-gray-700 rounded pl-6 mb-3 w-5/6 text-gray-100">title</div>
        <div className="h-6 bg-gray-700 rounded pl-6 mb-3 w-4/5 text-gray-100">price</div>
        <div className="h-8 bg-gray-700 rounded pl-6 mb-3 w-4/5 text-gray-100">rating</div>
      </div>
    </div>
  );
};

export default SkeletonCard;
