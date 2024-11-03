import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { TbShoppingBagPlus } from "react-icons/tb";
import { RiLuggageCartFill } from "react-icons/ri";
import { PiUsersFill } from "react-icons/pi";
import { FaUsers, FaUserPen, FaUsersViewfinder } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { RiUploadCloud2Line } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits, MdShoppingCart } from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { SiShopify } from "react-icons/si";
import { GiSun } from "react-icons/gi";
import { BsMoonStarsFill } from "react-icons/bs";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { TfiUser } from "react-icons/tfi";

const Sidebar = ({ toggleDarkMode, darkMode, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    profile: false,
    products: false,
    orders: false,
    users: false,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleDropdown = (section) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const [newOrders, setNewOrders] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const unviewedOrders = 2;
      setNewOrders(unviewedOrders);
    };
    fetchOrders();
  }, []);

  return (
    <div
      className={`flex flex-col h-screen bg-slate-800 dark:bg-black text-white ${
        isOpen ? "w-64" : "w-24"
      } duration-300`}>
      <div className='p-4 flex justify-between items-center'>
        <button onClick={toggleSidebar} className='text-white text-2xl'>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        {isOpen && <h2 className='text-xl font-bold'>Dashboard</h2>}
        <button onClick={toggleDarkMode} className='text-white text-xl ml-4'>
          {darkMode ? (
            <GiSun className='text-yellow-400 text-3xl' />
          ) : (
            <BsMoonStarsFill className='text-blue-100 text-2xl' />
          )}
        </button>
      </div>
      <div className='flex-1 overflow-y-auto'>
        {/* Profile/Settings Section */}
        <div>
          <button
            onClick={() => toggleDropdown("profile")}
            className='flex items-center justify-between w-full px-4 py-3 hover:bg-purple-600 dark:hover:bg-gray-800'>
            <span className='flex items-center'>
              <LuUsers className='mr-2 text-2xl' />
              {isOpen && <span>Settings</span>}
            </span>
            {isOpen && (
              <FaChevronDown className={`${isDropdownOpen.profile ? "rotate-180" : ""} transition-transform`} />
            )}
          </button>
          <div
            className={`overflow-hidden ${
              isDropdownOpen.profile ? "max-h-40" : "max-h-0"
            } transition-max-height duration-300`}>
            <ul className='px-4 space-y-2'>
              <li className='py-2 px-3 hover:bg-purple-800 dark:hover:bg-gray-900 cursor-pointer'>
                <Link to='/dashboard/profile' className='flex items-center space-x-2'>
                  <FaUsersViewfinder className='text-lg' />
                  {isOpen && <span>View Profile</span>}
                </Link>
              </li>
              <li className='py-1 px-3 hover:bg-purple-800 dark:hover:bg-gray-900 cursor-pointer'>
                <Link to='/dashboard/update-profile' className='flex items-center space-x-2'>
                  <FaUserPen className='text-lg' />
                  {isOpen && <span>Update Profile</span>}
                </Link>
              </li>
              <li className='py-1 px-3 hover:bg-purple-800 dark:hover:bg-gray-900 cursor-pointer'>
                <Link to='/dashboard/upload-image' className='flex items-center space-x-2'>
                  <RiUploadCloud2Line className='text-lg' />
                  {isOpen && <span>Upload Image</span>}
                </Link>
              </li>
              <li className='py-1 px-3 hover:bg-purple-800 dark:hover:bg-gray-900 cursor-pointer'>
                <Link to='/dashboard/change-password' className='flex items-center space-x-2'>
                  <FaKey className='text-lg' />
                  {isOpen && <span>Change Password</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Products Section */}
        {isAdmin && (
          <div className='mt-4'>
            <button
              onClick={() => toggleDropdown("products")}
              className='flex items-center justify-between w-full px-4 py-3 hover:bg-purple-800 dark:hover:bg-gray-800'>
              <span className='flex items-center'>
                <RiLuggageCartFill className='mr-2 text-2xl' />
                {isOpen && <span>Products</span>}
              </span>
              {isOpen && (
                <FaChevronDown className={`${isDropdownOpen.products ? "rotate-180" : ""} transition-transform`} />
              )}
            </button>
            <div
              className={`overflow-hidden ${
                isDropdownOpen.products ? "max-h-40" : "max-h-0"
              } transition-max-height duration-300`}>
              <ul className='px-4 space-y-2'>
                <li className='py-1 px-3 hover:bg-purple-800 dark:hover:bg-gray-900 cursor-pointer flex items-center justify-between'>
                  <Link to='/dashboard/add-product' className='flex items-center space-x-2'>
                    <LiaCartPlusSolid className='text-2xl' />
                    <span>Add New Product</span>
                  </Link>
                </li>
                <li className='py-1 px-3 hover:bg-purple-800 dark:hover:bg-gray-900 cursor-pointer flex items-center justify-between'>
                  <Link to='/dashboard/view-products' className='flex items-center space-x-3'>
                    <SiShopify className='text-lg' />
                    <span>View Products</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Orders Section */}
        {isAdmin && (
          <div className='mt-4'>
            <button
              onClick={() => toggleDropdown("orders")}
              className='flex items-center justify-between w-full px-4 py-3 hover:bg-purple-800 dark:hover:bg-gray-800'>
              <span className='flex items-center'>
                <TbShoppingBagPlus className='mr-2 text-2xl' />

                {isOpen && <span>Orders</span>}
              </span>
              {isOpen && (
                <FaChevronDown className={`${isDropdownOpen.orders ? "rotate-180" : ""} transition-transform`} />
              )}
            </button>
            <div
              className={`overflow-hidden ${
                isDropdownOpen.orders ? "max-h-40" : "max-h-0"
              } transition-max-height duration-300`}>
              <ul className='px-4 space-y-2'>
                <li className='py-1 px-3 hover:bg-purple-800 dark:hover:bg-gray-900 cursor-pointer flex items-center justify-between'>
                  <Link to='/dashboard/add-product' className='flex items-center space-x-3'>
                    <AiOutlineDeliveredProcedure className='text-lg' />
                    <span>Delivered Order</span>
                  </Link>
                </li>

                <li className='py-1 px-3 hover:bg-purple-800 dark:hover:bg-gray-900 cursor-pointer flex items-center justify-between'>
                  <Link to='/dashboard/orders' className='relative flex items-center space-x-3'>
                    <div className='relative'>
                      <MdOutlineProductionQuantityLimits className='text-lg' />
                      {newOrders > 0 && (
                        <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'>
                          {newOrders}
                        </span>
                      )}
                    </div>
                    <span>View Orders</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Users Section */}
        {isAdmin && (
          <div className='mt-4'>
            <button
              onClick={() => toggleDropdown("users")}
              className='flex items-center justify-between w-full px-4 py-3 hover:bg-purple-800 dark:hover:bg-gray-800'>
              <span className='flex items-center'>
                <FaUsers className='mr-2 text-2xl' />

                {isOpen && <span>Users</span>}
              </span>
              {isOpen && (
                <FaChevronDown className={`${isDropdownOpen.users ? "rotate-180" : ""} transition-transform`} />
              )}
            </button>
            <div
              className={`overflow-hidden ${
                isDropdownOpen.users ? "max-h-40" : "max-h-0"
              } transition-max-height duration-300`}>
              <ul className='px-4 space-y-2'>
                <li className='py-1 px-3 hover:bg-purple-800 dark:hover:bg-gray-900 cursor-pointer flex items-center justify-between'>
                  <Link to='/dashboard/view-users' className='flex items-center space-x-2'>
                  <TfiUser className='text-lg' />
                    <span>View Users</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
