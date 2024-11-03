import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-700 text-white py-12 dark:bg-gradient-to-r dark:from-slate-600 dark:to-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-start">
          {/* Logo & Description */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-3xl font-bold mb-6">Multi Vendor Store</h3>
            <img src={logo} alt='Multi-vendor Logo' className='h-44 w-48 rounded-2xl hover:scale-110 transition-transform duration-300' />
            <p className="mt-2 text-sm">
              A one-stop solution for all your shopping needs. Explore a wide range of products from different vendors, and enjoy seamless shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="font-bold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline hover:text-gray-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline hover:text-gray-300">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:underline hover:text-gray-300">FAQ</Link></li>
              <li><Link to="/terms" className="hover:underline hover:text-gray-300">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="font-bold text-xl mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/returns" className="hover:underline hover:text-gray-300">Returns & Exchanges</Link></li>
              <li><Link to="/shipping" className="hover:underline hover:text-gray-300">Shipping Info</Link></li>
              <li><Link to="/privacy" className="hover:underline hover:text-gray-300">Privacy Policy</Link></li>
              <li><Link to="/support" className="hover:underline hover:text-gray-300">Support Center</Link></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="w-full md:w-1/4 flex flex-col items-center md:items-end space-y-4">
            <h4 className="font-bold text-xl mb-4">Follow Us</h4>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-500">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-500">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-700">
                <FaLinkedin />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-red-700">
                <FaPinterest />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t border-gray-700 pt-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Multi Vendor Store. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
