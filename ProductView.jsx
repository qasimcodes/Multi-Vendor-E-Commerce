import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../context/auth";

const ProductView = ({ products, handleSearch, searchQuery }) => {
  const [auth, setAuth] = useAuth();
  const { isAdmin } = auth?.user;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard/profile"); // Redirect to the profile page if not admin
    }
  }, [isAdmin, navigate]);

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
      <div className='flex justify-between mb-4'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Products</h2>
        <div className='flex items-center'>
          <input
            type='text'
            placeholder='Search products...'
            className='p-2 border-2 text-black border-gray-300 rounded-lg mr-2 focus:outline-none'
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FaSearch className='text-gray-400 dark:text-gray-300' />
        </div>
      </div>
      <table className='w-full text-left'>
        <thead>
          <tr>
            <th className='p-4'>Image</th>
            <th className='p-4'>Name</th>
            <th className='p-4'>Category</th>
            <th className='p-4'>Price</th>
            <th className='p-4'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='border-t dark:border-gray-700 dark:hover:bg-purple-500 hover:bg-indigo-200'>
              <td className='p-4'>
                <img src={product.image} alt={product.name} className='w-16 h-16 object-cover rounded-lg' />
              </td>
              <td className='p-4'>{product.name}</td>
              <td className='p-4'>{product.category}</td>
              <td className='p-4'>${product.price}</td>
              <td className='p-4 flex items-center space-x-4'>
                <FaEye className='text-blue-500 mt-4 text-xl hover:text-blue-700 cursor-pointer transition-colors' />
                <FaEdit className='text-green-500 mt-4 text-xl hover:text-green-700 cursor-pointer transition-colors' />
                <FaTrash className='text-red-500 mt-4 text-xl hover:text-red-700 cursor-pointer transition-colors' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductView;
