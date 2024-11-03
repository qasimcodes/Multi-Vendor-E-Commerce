import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../context/auth";

const OrderView = ({ orders, handleSearch, searchQuery }) => {
  const [auth, setAuth] = useAuth();
  const { isAdmin } = auth?.user;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard/profile"); // Redirect to the profile page if not admin
    }
  }, [isAdmin, navigate]);

    return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search orders..."
            className="p-2 border-2 border-gray-300 rounded-lg mr-2 focus:outline-none"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FaSearch className="text-gray-400 dark:text-gray-300" />
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-4">Order #</th>
            <th className="p-4">Date</th>
            <th className="p-4">Product Details</th>
            <th className="p-4">Customer Name</th>
            <th className="p-4">Address</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t dark:border-gray-700 dark:hover:bg-purple-500 hover:bg-indigo-200">
              <td className="p-4">{order.orderNumber}</td>
              <td className="p-4">{order.date}</td>
              <td className="p-4">{order.productDetails}</td>
              <td className="p-4">{order.customerName}</td>
              <td className="p-4">{order.address}</td>
              <td className="p-4">{order.status}</td>
              <td className="p-4 flex items-center space-x-4">
                <FaEye className="text-blue-500 cursor-pointer" />
                <FaTrash className="text-red-500 cursor-pointer" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
};

export default OrderView  