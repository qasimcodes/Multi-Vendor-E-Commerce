import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './../layouts/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import Typed from 'typed.js';
import SkeletonCard from './../layouts/SkeletonCard'; 
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, pagination } = useSelector((state) => state.product);
  const typedRef = useRef(null);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts(1));

    const options = {
      strings: ['<span style="color: #f13a1a;">Multi</span> <span style="color: #b060f1;">Vendor</span> <span style="color: #d8de19;">Store</span>'],
      typeSpeed: 80,
      backSpeed: 30,
      loop: true, 
      showCursor: true,
      onComplete: (self) => {
        setTimeout(() => {
          setTextVisible(true); 
          self.cursor.remove(); 
        }, 1000); 
      },
    };

    typedRef.current = new Typed('#typed-element', options);

    return () => {
      if (typedRef.current) typedRef.current.destroy();
    };
  }, [dispatch]);

  const paginationBtnClick = (page) => {
    dispatch(fetchProducts(page));
    setTextVisible(true); // Reset text visibility when fetching new products
  };

  return (
    <AnimatePresence>
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
        <div className="flex justify-center mb-6">
          <motion.span
            id="typed-element"
            className={`font-bold text-center text-3xl sm:text-4xl md:text-5xl transition-opacity duration-500 ${textVisible ? 'opacity-100' : 'opacity-0'}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: textVisible ? 1 : 0 }}
            style={{ height: '1.5em', overflow: 'hidden' }} // Prevent layout shift
          ></motion.span>
        </div>

        <h1 className="font-semibold font-mono text-center text-4xl my-6 dark:text-white text-black">
          Show Latest Products
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-5">
            {Array.from({ length: 30 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-5">
            {products.map((product, index) => (
              <motion.div
                key={product._id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1.2, delay: index * 0.3 }} 
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="pagination">
          <button
            className="flex w-11 h-11 mr-3 justify-center items-center rounded-full border border-orange-400 bg-white text-purple-800 hover:bg-purple-700 hover:text-white"
            onClick={() => paginationBtnClick(1)}
          >
            <SlArrowLeft />
          </button>

          {Array.from(Array(pagination.totalPages), (e, i) => {
            return (
              <button
                className={
                  pagination.currentPage === i + 1
                    ? 'hidden md:inline-flex w-11 h-11 mr-3 justify-center items-center rounded-full border border-orange-400 bg-purple-800 text-white'
                    : 'hidden md:inline-flex w-11 h-11 mr-3 justify-center items-center rounded-full border border-orange-400 bg-white text-purple-800 hover:bg-purple-700 hover:text-white'
                }
                key={i}
                onClick={() => paginationBtnClick(i + 1)}
              >
                {i + 1}
              </button>
            );
          })}

          <button
            className="flex w-11 h-11 ml-3 justify-center items-center rounded-full border border-orange-400 bg-white text-purple-800 hover:bg-purple-700 hover:text-white"
            onClick={() => paginationBtnClick(pagination.totalPages)}
          >
            <SlArrowRight />
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Home;
