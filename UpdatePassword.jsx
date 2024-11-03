import { FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { BsFillLockFill } from "react-icons/bs";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../layouts/Loader";
import { errorToast, successToast } from "../../functions/toastify";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { TbPasswordUser } from "react-icons/tb";

const UpdatePassword = () => {
  /* context */
  const [auth, setAuth] = useAuth();
  const { isAdmin } = auth?.user;

  const [darkMode, setDarkMode] = useState(false);

  /* states */
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const changePawdHandler = async (e) => {
    e.preventDefault();

    // Validate if new password and confirm password match
    if (newPassword !== confirmPassword) {
      errorToast("New Password and Confirm Password do not match");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.put(`/update-password`, { oldPassword, newPassword });
      if (data?.error) {
        errorToast(data.error);
        setLoading(false);
      } else {
        successToast(data?.message);
        setLoading(false);
        navigate("/dashboard/profile");
      }
    } catch (err) {
      console.log(err);
      errorToast("Something went wrong. Try again!!");
      setLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen bg-gray-100 dark:bg-slate-800'>
      {/* Sidebar */}
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} isAdmin={isAdmin} />

      <div className='flex-grow flex items-center justify-center'>
        <div className='relative p-5 rounded-lg shadow-md w-full max-w-md transition-all duration-300 transform hover:scale-105 hover:border-gray-200 border-1 border-transparent'>
          <div className='absolute inset-0 border-4 border-solid border-transparent rounded-lg pointer-events-none transition-all duration-300 hover:border-orange-500'></div>
          <div className='relative z-10 bg-black hover:bg-[#212121] dark:bg-gray-900 dark:hover:bg-black p-6 rounded-lg shadow-md'>
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className='flex justify-center mb-1'>
                  <BsFillLockFill className='text-white text-6xl' />
                </div>
                <h2 className='text-2xl font-semibold text-center mb-6 text-white'> Change Password</h2>
              </>
            )}

            <form onSubmit={changePawdHandler}>
              {/* Old Password */}
              <div className='mb-4 relative'>
                <label htmlFor='oldPassword' className='block text-gray-300 text-sm font-bold mb-2'>
                  Old Password
                </label>
                <div className='flex items-center border-b border-gray-600 py-2 transition-all duration-300 hover:border-orange-500 relative'>
                  <FaLock className='text-gray-500 mr-3' />
                  <input
                    type={showOldPassword ? "text" : "password"}
                    id='oldPassword'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className='appearance-none bg-transparent border-none w-full text-white rounded placeholder:mr-3 py-1 px-2 leading-tight placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-0'
                    placeholder='Enter old password'
                  />
                  <span onClick={() => setShowOldPassword(!showOldPassword)} className='cursor-pointer'>
                    {showOldPassword ? <FaEyeSlash className='text-gray-500' /> : <FaEye className='text-gray-500' />}
                  </span>
                </div>
              </div>

              {/* New Password */}
              <div className='mb-4 relative'>
                <label htmlFor='newPassword' className='block text-gray-300 text-sm font-bold mb-2'>
                  New Password
                </label>
                <div className='flex items-center border-b border-gray-600 py-2 transition-all duration-300 hover:border-orange-500 relative'>
                  <FaLock className='text-gray-500 mr-3' />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id='newPassword'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='appearance-none bg-transparent border-none w-full text-white rounded mr-3 py-1 px-2 leading-tight placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-0'
                    placeholder='Enter new password'
                  />
                  <span onClick={() => setShowNewPassword(!showNewPassword)} className='cursor-pointer'>
                    {showNewPassword ? <FaEyeSlash className='text-gray-500' /> : <FaEye className='text-gray-500' />}
                  </span>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className='mb-5 relative'>
                <label htmlFor='confirmPassword' className='block text-gray-300 text-sm font-bold mb-2'>
                  Confirm New Password
                </label>
                <div className='flex items-center border-b border-gray-600 py-2 transition-all duration-300 hover:border-orange-500 relative'>
                  <FaLock className='text-gray-500 mr-3' />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='appearance-none bg-transparent border-none w-full text-white rounded mr-3 py-1 px-2 leading-tight placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-0'
                    placeholder='Confirm new password'
                  />
                  <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='cursor-pointer'>
                    {showConfirmPassword ? <FaEyeSlash className='text-gray-500' /> : <FaEye className='text-gray-500' />}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
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
                    <TbPasswordUser className='mr-2' /> Change Password
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
