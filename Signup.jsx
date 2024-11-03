import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './../layouts/Loader';
import { errorToast, successToast } from '../functions/toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { HiEye, HiEyeOff } from "react-icons/hi"; 
import { useAuth } from "../context/auth";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  /* context */
  const [auth, setAuth] = useAuth();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/pre-signup`, { email, password });
      if (data?.error) {
        errorToast(data.error);
        setLoading(false);
      } else {
        successToast(data.success);
        setLoading(false);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      errorToast('Something went wrong. Try again!!');
      setLoading(false);
    }
  };

  // Redirect if already authenticated
  useEffect(() => {


    if (auth?.user?.email) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-800">
      <div className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-3xl overflow-hidden p-7 space-y-8 transition-all duration-300 border border-transparent hover:border-purple-500">
        <h2 className="text-center text-4xl font-extrabold text-white">
          {loading ? <Loader /> : 'Welcome'}
        </h2>
        <p className="text-center text-gray-200 text-lg">
          Pre Signup - Welcome to the Multi Vendor Store
        </p>
        <form method="POST" onSubmit={signupHandler} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <input
              placeholder="admin@codeatcloud.com"
              className="peer h-12 w-full border-2 border-transparent rounded-lg bg-transparent text-white placeholder-transparent focus:outline-none focus:border-orange-500 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="text"
            />
            <label
              className={`absolute left-3 top-4 text-gray-500 text-lg transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 
                peer-focus:-top-5 peer-focus:text-orange-500 peer-focus:text-sm
                ${email ? '-top-5 text-sm text-orange-500' : ''}`}
              htmlFor="email"
            >
              Email address
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              placeholder="Password"
              className="peer h-12 w-full border-2 border-transparent rounded-lg bg-transparent text-white placeholder-transparent focus:outline-none focus:border-orange-500 transition-all duration-300 pr-10" // Added pr-10 for icon space
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
            />
            <label
              className={`absolute left-3 top-4 text-gray-500 text-lg transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 
                peer-focus:-top-5 peer-focus:text-orange-500 peer-focus:text-sm
                ${password ? '-top-5 text-sm text-orange-500' : ''}`}
              htmlFor="password"
            >
              Password
            </label>
            {/* Toggle Button for Password Visibility */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-purple-500 hover:text-purple-700 
              dark:text-orange-500 dark:hover:text-orange-700 focus:outline-none"
            >
              {showPassword ? <HiEye className="text-2xl" /> : <HiEyeOff className="text-2xl" />}
            </button>
          </div>

          {/* Submit Button */}
          <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200 flex items-center justify-center">
            <FaSignInAlt className="mr-2" /> SignUp
          </button>

          <div className="mt-1">
            <Link to="/login" className="text-sm font-semibold text-yellow-200 hover:text-purple-200">
              Already have an Account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
