import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import profile from "../../img/profile.png";
import { useAuth } from "../../context/auth";
import { calculateDateDifference } from "../../functions/func";

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [auth] = useAuth();

  const { username, role, email, address, phone, createdAt, company } = auth?.user;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`flex h-screen ${darkMode ? "bg-slate-900" : "bg-slate-800"} text-white`}>
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} isAdmin={auth?.user?.isAdmin} />
      <div className='flex-1 flex'>
        {/* Left side: Profile Image */}
        <div className='flex-none w-2/5 relative flex items-center justify-center p-4'>
          <div className='relative w-full h-full border-8 border-gradient hover:border-purple-800 hover:animate-pulse rounded-lg overflow-hidden'>
            <Link to='/dashboard/upload-image'>
              <img
                title='Click to upload new image'
                src={auth.user?.profileImage}
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </Link>
          </div>
        </div>

        {/* Right side: User Details */}
        <div className='flex-1 w-3/5 dark:bg-slate-800 dark:text-white bg-slate-200 text-black p-6'>
          <div className='mb-3 p-2 bg-purple-800 text-white text-center rounded-lg'>
            <p className='text-lg font-semibold'>Welcome to your profile!</p>
            <p className='mt-1'>
              You can manage your account <Link to='/dashboard/update-profile'>settings here.</Link>
            </p>
          </div>

          <h1 className='text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-800 to-white'>
            {auth?.user?.name || (
              <p className='mt-1 text-xl font-semibold'>
                <u>
                  <Link to='/dashboard/update-profile'>Go to update profile to provide Name</Link>
                </u>
              </p>
            )}
          </h1>

          <h2 className='text-xl font-semibold mb-4'>User Details</h2>
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-gradient-to-r from-purple-800 via-red-800 to-gray-600 text-white border border-gray-300 dark:border-yellow-300 rounded-lg shadow-md'>
              <tbody>
                <tr className='border-b dark:border-yellow-300 border-gray-300 hover:bg-purple-900 dark:bg-black dark:hover:bg-red-900 hover:text-white transition-colors duration-300'>
                  <td className='px-4 py-2 font-semibold text-sm'>Username:</td>
                  <td className='px-4 py-2 text-sm'>{username}</td>
                </tr>
                <tr className='border-b border-gray-300 hover:bg-purple-900 hover:text-white transition-colors duration-300'>
                  <td className='px-4 py-2 font-semibold text-sm'>Role:</td>
                  <td className='px-4 py-2 text-sm'>
                    {Array.isArray(role) && role.length > 0
                      ? role.join(", ").charAt(0).toUpperCase() + role.join(", ").slice(1).toLowerCase()
                      : ""}
                  </td>
                </tr>
                <tr className='border-b dark:border-yellow-300 border-gray-300 hover:bg-purple-900 dark:bg-black dark:hover:bg-red-900 hover:text-white transition-colors duration-300'>
                  <td className='px-4 py-2 font-semibold text-sm'>Email:</td>
                  <td className='px-4 py-2 text-sm'>{email}</td>
                </tr>
                <tr className='border-b border-gray-300 hover:bg-purple-900 hover:text-white transition-colors duration-300'>
                  <td className='px-4 py-2 font-semibold text-sm'>Address:</td>
                  <td className='px-4 py-2 text-sm'>{address || "Provide Home Address"}</td>
                </tr>
                <tr className='border-b dark:border-yellow-300 border-gray-300 hover:bg-purple-900 dark:bg-black dark:hover:bg-red-900 hover:text-white transition-colors duration-300'>
                  <td className='px-4 py-2 font-semibold text-sm'>Phone:</td>
                  <td className='px-4 py-2 text-sm'>{phone || "Provide Phone #"}</td>
                </tr>
                <tr className='border-b border-gray-300 hover:bg-purple-900 hover:text-white transition-colors duration-300'>
                  <td className='px-4 py-2 font-semibold text-sm'>Account Created:</td>
                  <td className='px-4 py-2 text-sm'>
                    {createdAt
                      ? new Intl.DateTimeFormat("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          weekday: "long",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        }).format(new Date(createdAt))
                      : "Date not available"}
                  </td>
                </tr>
                <tr className='border-b dark:border-yellow-300 border-gray-300 hover:bg-purple-900 dark:bg-black dark:hover:bg-red-900 hover:text-white transition-colors duration-300'>
                  <td className='px-4 py-2 font-semibold text-sm'>Account Signup Age:</td>
                  <td className='px-4 py-2 text-sm'>{calculateDateDifference(createdAt)}</td>
                </tr>
                <tr className='border-b border-gray-300 hover:bg-purple-900 hover:text-white transition-colors duration-300'>
                  <td className='px-4 py-2 font-semibold text-sm'>Company:</td>
                  <td className='px-4 py-2 text-sm'>{company || "Provide Company Name"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
