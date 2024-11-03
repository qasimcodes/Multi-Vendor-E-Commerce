import React, { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUserLock,
  FaTv,
  FaMobileAlt,
  FaLaptop,
  FaTshirt,
  FaCogs,
  FaSignOutAlt,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { AiOutlineLogin } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa6";
import { RiListOrdered } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import profile from "../img/profile.png";
import logo from "../img/logo.png";
import nouser from "../img/nouser.png";
import { TbShoppingBagSearch } from "react-icons/tb";
import { ImCart } from "react-icons/im";
import { TbShoppingBagX } from "react-icons/tb";
import { MdAttachEmail } from "react-icons/md";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { toggleFavorites } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/auth";
import { resetCart, removeCartItem } from "../redux/actions/cartActions";
import DarkLightModeToggle from "./DarkLightMode";
import { successToast } from "../functions/toastify";

const Navigation = () => {
  const [auth, setAuth] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { favoritesToggled } = useSelector((state) => state.product);

  const cartRef = useRef(null);
  const profileRef = useRef(null);
  const catRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (catRef.current && !catRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const toggleDropdown = (dropdownSetter, currentState) => {
    dropdownSetter(!currentState);
  };

  const handleCartQuantityChange = (action) => {
    setCartCount((prevCount) => (action === "increase" ? prevCount + 1 : Math.max(1, prevCount - 1)));
  };

  const clearCart = () => dispatch(resetCart());

  /* logout */
  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    successToast("You are successfully logged!");
    navigate("/login");
  };

  const loggedIn = auth.user !== null && auth.token !== "" && auth.refreshToken !== "";

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white p-3 dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-900 fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-300">

      <div className='flex justify-between items-center max-w-screen-xl mx-auto'>
        {/* Logo */}
        <div className='flex items-center space-x-5 '>
          <img src={logo} alt='Multi-vendor Logo' className='h-16 w-20 rounded-2xl hover:scale-110' />

          {/* Navigation Links */}
          <div className='hidden md:flex space-x-8 text-lg'>
            <Link
              to='/'
              className='nav-link flex items-center space-x-1 transition-all duration-300 hover:text-orange-500'>
              <span>Home</span>
              <FaHome className='text-lg' />
            </Link>
            <div className='relative group' ref={catRef}>
              <Link
                to='/'
                onClick={() => toggleDropdown(setIsCategoryOpen, isCategoryOpen)}
                className='nav-link flex items-center space-x-1 transition-all duration-300 hover:text-orange-500'>
                <span>Categories</span>
                <GiShoppingBag className='text-lg' />
              </Link>
              {(isCategoryOpen || isMenuOpen) && (
                <div className='absolute left-0 mt-2 bg-purple-600 text-white rounded-lg shadow-lg p-2 transition-all duration-300'>
                  <Link
                    to=''
                    className='flex items-center space-x-1 text-xs px-2 py-1 hover:bg-purple-700 rounded transition-all duration-300'>
                    <FaTv />
                    <span>Electronics</span>
                  </Link>
                  <Link
                    to=''
                    className='flex items-center space-x-1 text-xs px-2 py-1 hover:bg-purple-700 rounded transition-all duration-300'>
                    <FaMobileAlt />
                    <span>Mobiles</span>
                  </Link>
                  <Link
                    to=''
                    className='flex items-center space-x-1 text-xs px-2 py-1 hover:bg-purple-700 rounded transition-all duration-300'>
                    <FaLaptop />
                    <span>Laptops</span>
                  </Link>
                  <Link
                    to=''
                    className='flex items-center space-x-1 text-xs px-2 py-1 hover:bg-purple-700 rounded transition-all duration-300'>
                    <FaCogs />
                    <span>Accessories</span>
                  </Link>
                  <Link
                    to=''
                    className='flex items-center space-x-1 text-xs px-2 py-1 hover:bg-purple-700 rounded transition-all duration-300'>
                    <FaTshirt />
                    <span>Garments</span>
                  </Link>
                  <Link
                    to=''
                    className='flex items-center space-x-1 text-xs px-2 py-1 hover:bg-purple-700 rounded transition-all duration-300'>
                    <FaBoxOpen />
                    <span>Shoes</span>
                  </Link>
                </div>
              )}
            </div>
            <Link
              to='/contact'
              className='nav-link flex items-center space-x-1 transition-all duration-300 hover:text-orange-500'>
              <span>Contact Us</span>
              <MdAttachEmail className='text-lg' />
            </Link>
          </div>
        </div>

        {/* show the Middle: Search Bar */}
        <div className='hidden md:flex items-center bg-white text-black rounded-lg transition-all duration-300 hover:border-indigo-800 hover:border-2 w-72 hover:w-96'>
          <input type='text' placeholder='Search Product...' className='outline-none px-2 py-2 w-full rounded-l' />
          <div className='bg-purple-600 py-3 flex items-center justify-center hover:bg-orange-500 transition-all duration-300 rounded-r'>
            <TbShoppingBagSearch className='text-white text-3xl mx-3' />
          </div>
        </div>

        {/* show the Right Side: Cart, Profile, favorites & Modes */}
        <div className='flex items-center space-x-3'>
          {/* Dark & Light Theme */}
          <div className='relative group'>
            <DarkLightModeToggle />
          </div>

          {/* Favorite Heart Wishlist  */}
          <div className='relative group'>
            {favoritesToggled ? (
              <button onClick={() => dispatch(toggleFavorites(false))}>
                <MdOutlineFavorite className='heart2 animate-pulse hover:animate-bounce' />
              </button>
            ) : (
              <button onClick={() => dispatch(toggleFavorites(true))}>
                <MdOutlineFavoriteBorder className='heart2 animate-pulse hover:animate-bounce' />
              </button>
            )}
          </div>

          {/* show the Cart Icon */}
          <div className='relative' ref={cartRef}>
            <ImCart
              className='cursor-pointer text-3xl transition-all duration-300 hover:scale-110 hover:text-yellow-200 mr-2 animate-pulse dark:text-red-600'
              onClick={() => toggleDropdown(setIsCartOpen, isCartOpen)}
            />
            {cartItems.length > 0 && (
              <span className='absolute -top-3 -right-2 bg-orange-600 dark:bg-red-600 rounded-full dark:text-white text-xs px-2 py-1 animate-bounce hover:bg-red-600'>
                {cartItems.length}
              </span>
            )}
            {isCartOpen && (
              <div className={`absolute right-0 mt-2 ${
                  cartItems.length > 0 ? "w-[286px]" : "w-[180px]"
                } dark:bg-purple-500 bg-purple-600 text-white p-2 rounded-lg shadow-lg hover:bg-purple-700`}>
                {cartItems.map((item) => (
                  <div key={item.id} className='flex items-center justify-between mb-2 text-xs'>
                    <div className='flex items-center flex-1'>
                      <img src={item.image} alt='Product' className='h-10 w-10 rounded' />
                      <div className='ml-2 flex flex-col'>
                        <p className='font-normal'>{item.name}</p>
                        <p className='text-xs text-gray-300'>{item.brand}</p>
                        <p className='text-xs text-gray-300'>{item.category}</p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <p className='font-normal'>
                        {item.price} x {item.qty}
                      </p>
                      <p className='font-bold'>{item.price * item.qty}</p>
                    </div>
                  </div>
                ))}

                {cartItems.length > 0 && (
                  <div className='flex items-center justify-between mt-2 border-t border-gray-500 pt-2'>
                    <span className='font-bold'>Total</span>
                    <span className='font-bold'>
                      {cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)} Rs
                    </span>
                  </div>
                )}

                {cartItems.length > 0 ? (
                  <div className='flex items-center justify-between mt-2'>
                    <Link
                      to='/cart'
                      className='bg-purple-700 hover:bg-purple-900 text-white rounded-full p-2 text-[10px] font-bold hover:text-orange-200'>
                      View Cart
                    </Link>
                    <button onClick={clearCart} title='Clear Cart' className='text-red-100 text-lg font-bold ml-3'>
                      <TbShoppingBagX />
                    </button>
                  </div>
                ) : (
                  <>Nothing in the cart</>
                )}
              </div>
            )}
          </div>

          {/* show the Profile Icon */}
          {loggedIn ? (
            <div className='relative' ref={profileRef}>
              <img
                src={auth.user?.profileImage}
                alt='Profile'
                className='cursor-pointer rounded-full w-12 h-12 border-2 border-white transition-all hover:animate-spin duration-300 hover:scale-110'
                onClick={() => toggleDropdown(setIsProfileOpen, isProfileOpen)}
              />
              {isProfileOpen && (
                <div className='absolute right-0 mt-2 w-56 bg-purple-600 text-white rounded-lg shadow-lg p-2 transition-all duration-300'>
                  <Link
                    to='/dashboard/profile'
                    className='flex items-center space-x-2 text-lg px-2 py-1 hover:bg-purple-700 rounded  transition-all duration-300'>
                    <span className='font-bold text-sm text-white hover:text-yellow-300 '>
                      {auth?.user?.name  ? auth.user?.name : "User"}

                      <br />
                      <b className='text-orange-300'> {auth.user?.email} </b>
                    </span>
                  </Link>
                  <Link
                    to='/dashboard'
                    className='flex items-center space-x-2 text-xs px-2 py-1 hover:bg-purple-700 rounded transition-all duration-300'>
                    <FaUserTie />
                    <span> Dashboard </span>
                  </Link>
                  <Link
                    to='/dashboard/update-profile'
                    className='flex items-center space-x-2 text-xs px-2 py-1 hover:bg-purple-700 rounded transition-all duration-300'>
                    <FaCogs />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to='/orders'
                    className='flex items-center space-x-2 text-xs px-2 py-1 hover:bg-purple-700 rounded transition-all duration-300'>
                    <RiListOrdered />
                    <span>Orders </span>
                  </Link>
                  <button
                    onClick={logout}
                    className='flex items-center space-x-2 text-xs px-2 py-1 hover:bg-purple-700 rounded transition-all duration-300'>
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='relative' ref={profileRef}>
              <img
                src={nouser}
                alt='Profile'
                className='cursor-pointer rounded-full w-12 h-12 border-2 border-white transition-all hover:animate-spin duration-300 hover:scale-110'
                onClick={() => toggleDropdown(setIsProfileOpen, isProfileOpen)}
              />
              {isProfileOpen && (
                <div className='absolute right-0 mt-[-6px] w-56 bg-purple-600 dark:slate-800 text-white rounded-lg shadow-lg p-[-0.5rem] transition-all duration-300'>
                  {/* show the If user is not logged in */}
                  <div className='absolute right-0 mt-2 w-56 bg-purple-600 dark:slate-800 text-white rounded-lg shadow-lg transition-all duration-300'>
                    <Link to='/login' className='flex items-center justify-between px-2 py-1 hover:bg-purple-700'>
                      <span>Login</span>
                      <AiOutlineLogin className='ml-2' />
                    </Link>
                    <Link to='/signup' className='flex items-center justify-between px-2 py-1 hover:bg-purple-700'>
                      <span>Signup</span>
                      <FaUserLock className='ml-2' />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* show the Hamburger Menu Icon */}
          <div className='md:hidden flex items-center'>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "transform rotate-45 translate-y-1" : ""
                }`}></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "hidden" : ""
                }`}></span>
              <span
                className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "transform -rotate-45 -translate-y-1" : ""
                }`}></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
