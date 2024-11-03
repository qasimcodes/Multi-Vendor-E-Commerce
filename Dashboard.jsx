import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProductView from "./ProductView";
import OrderView from "./OrderView";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  //const [isAdmin, setIsAdmin] = useState(true);
  const [auth, setAuth] = useAuth();
  const { role, isAdmin } = auth?.user;
  const [searchQuery, setSearchQuery] = useState("");
  const gradients = [
    'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
    'bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500',
    'bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500',
    'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500',
    'bg-gradient-to-r from-green-400 via-teal-500 to-blue-500'
  ];
  const [currentGradient, setCurrentGradient] = useState(0);

  // Change gradient colors every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 1000); 

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", category: "Electronics", price: 999, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Smartphone", category: "Mobiles", price: 699, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Headphones", category: "Accessories", price: 199, image: "https://via.placeholder.com/150" },
  ]);



  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "12345",
      date: "2024-09-12",
      productDetails: "Laptop",
      customerName: "Syed Bilal",
      address: "Johar Town",
      status: "Shipped",
    },
    {
      id: 2,
      orderNumber: "12346",
      date: "2024-09-11",
      productDetails: "Smartphone",
      customerName: "Tabish Iqbal",
      address: "Model Town Lahore",
      status: "Pending",
    },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredOrders = orders.filter((order) => order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={`${darkMode ? "dark" : ""} flex h-screen`}>
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} isAdmin={isAdmin} />
      <div className='flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'>
      <h1 className={`text-5xl font-bold mt-6 mb-8 text-transparent bg-clip-text ${gradients[currentGradient]}`} >
        Welcome to the Multi Vendor Dashboard
      </h1>

        <h5 className='text-2xl mr-4 mb-2 gradient-text2 gradient-text-hover2'>Hello {isAdmin ? "Admin" : "User"},</h5>
        <Routes>
          <Route
            path='view-products'
            element={<ProductView products={filteredProducts} handleSearch={handleSearch} searchQuery={searchQuery} />}
          />
          <Route
            path='orders'
            element={<OrderView orders={filteredOrders} handleSearch={handleSearch} searchQuery={searchQuery} />}
          />
          <Route path='/' element={
              <div className="flex items-center justify-center">
                <div className="border-2 border-dashed rounded-lg bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 animate-pulse">
                  <h1 className="text-3xl font-bold">
                    Please select a section from the sidebar
                  </h1>
                </div>
              </div>
            } />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
