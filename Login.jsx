import { FaUser, FaLock, FaSignInAlt, FaGoogle } from "react-icons/fa";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useAuth } from "../context/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./../layouts/Loader";
import { errorToast, successToast } from "../functions/toastify";
import React, { useState, useEffect } from "react";
import { LiaUserLockSolid } from "react-icons/lia";
import { RiLockPasswordLine } from "react-icons/ri";
import login from '../img/login-user.jpg';

const Login = () => {
  /* context */
  const [auth, setAuth] = useAuth();
  /* states */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (auth?.user?.email) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/login`, { email, password });
      if (data?.error) {
        errorToast(data.error);
        setLoading(false);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        successToast("You are Login Successfully");
        setLoading(false);
        location?.state !== null ? navigate(location.state) : navigate("/dashboard");
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      errorToast("Something went wrong. Try again!!");
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-800'>
      <div className='relative p-5 rounded-lg shadow-md w-full max-w-md transition-all duration-300 transform hover:scale-105 hover:border-gray-200 border-1 border-transparent'>
        <div className='absolute inset-0 border-4 border-solid border-transparent rounded-lg pointer-events-none transition-all duration-300 hover:border-orange-500'></div>
        <div className='relative z-10 bg-black hover:bg-[#212121] dark:bg-gray-900 dark:hover:bg-black p-6 rounded-lg shadow-md'>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className='flex justify-center mb-4'>
                <img src={login} alt="Login User" />
              </div>
              <h2 className='text-2xl font-semibold text-center mb-3 text-white'>Multi Vendor - Login</h2>
            </>
          )}

          <form onSubmit={loginHandler}>
            {/* Email Field */}
            <div className='mb-4 relative'>
              <label htmlFor='email' className='block text-gray-300 text-sm font-bold mb-2'>
                Email
              </label>
              <div className='flex items-center border-b border-gray-600 py-2 transition-all duration-300 hover:border-orange-500 relative'>
                <FaUser className='text-gray-500 mr-3' />
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none bg-transparent border-none w-full text-white rounded placeholder:mr-3 py-2 px-2 leading-tight placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-0'
                  placeholder='Email'
                />
              </div>
            </div>

            {/* Password Field */}
            <div className='mb-5 relative'>
              <label htmlFor='password' className='block text-gray-300 text-sm font-bold mb-2'>
                Password
              </label>
              <div className='flex items-center border-b border-gray-600 py-2 transition-all duration-300 hover:border-orange-500 relative'>
                <FaLock className='text-gray-500 mr-3' />
                <input
                  type={passwordVisible ? "text" : "password"}
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='appearance-none bg-transparent border-none w-full text-white rounded py-2 px-2 leading-tight placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-0'
                  placeholder='Password'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='text-purple-500 hover:text-purple-700 
                  dark:text-orange-500 dark:hover:text-orange-700 focus:outline-none absolute right-0 pr-3'
                >
                   {passwordVisible ? <BsFillEyeFill className="text-2xl" /> : <BsFillEyeSlashFill className="text-2xl" />}
                </button>
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-transparent border border-purple-600 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 flex items-center justify-center'>
              {loading ? (
                <div className='three-body'>
                  <div className='three-body__dot'></div>
                  <div className='three-body__dot'></div>
                  <div className='three-body__dot'></div>
                </div>
              ) : (
                <>
                  <FaSignInAlt className='mr-2' /> Login
                </>
              )}
            </button>
          </form>

          <div className='flex justify-between mt-3'>
            <Link
              to='/signup'
              disabled={loading}
              className='rounded border border-sky-300 text-sky-600 font-sm py-1 px-2 hover:bg-sky-600 hover:text-white transition-all duration-300 focus:outline-none flex items-center justify-center text-sm'>
              Signup <LiaUserLockSolid />
            </Link>
            <Link
              to='/auth/forget-password'
              className='border border-orange-500 text-orange-500 font-sm rounded py-1 px-2 hover:bg-orange-500 hover:text-white transition-all duration-300 focus:outline-none text-sm flex items-center justify-center'>
              Forget password? <RiLockPasswordLine />
            </Link>
          </div>

          <button
            type='button'
            className='w-full bg-transparent border border-red-600 text-red-600 font-semibold py-1 px-4 rounded hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center mt-3'>
            <FaGoogle className='mr-2' /> Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
