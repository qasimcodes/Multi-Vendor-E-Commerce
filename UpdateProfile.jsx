import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Sidebar from "./Sidebar";
import { errorToast, successToast } from "../../functions/toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../layouts/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";


const UpdateProfile = () => {
  const [auth, setAuth] = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Full Name is required"),
    company: Yup.string().required("Company is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().required("Phone is required"),
  });

  // Formik hook to manage form state and validation
  const formik = useFormik({
    initialValues: {
      username: auth?.user?.username || "",
      name: auth?.user?.name || "",
      company: auth?.user?.company || "",
      address: auth?.user?.address || "",
      phone: auth?.user?.phone || "",
      role: auth?.user?.role || "buyer",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await axios.put("/update-profile", values);

        if (data?.error) {
          setLoading(false);
          errorToast(data.error);
        } else {
          setAuth({ ...auth, user: data });
          const authDataFromLS = JSON.parse(localStorage.getItem("auth"));
          authDataFromLS.user = data;
          localStorage.setItem("auth", JSON.stringify(authDataFromLS));
          setLoading(false);
          successToast("Profile updated successfully");
          navigate("/dashboard");
        }
      } catch (err) {
        setLoading(false);
        errorToast("An error occurred. Please try again.");
      }
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`${darkMode ? "dark" : ""} flex h-screen`}>
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} isAdmin={auth?.user?.isAdmin} />
      <div className='flex items-center justify-center w-full h-full p-4'>
        <div className='w-full max-w-4xl bg-slate-800 dark:bg-purple-300 p-6 rounded-lg shadow-lg'>
          <h1 className='text-3xl font-bold text-purple-100 mb-6 dark:text-purple-800 text-center'>
            {loading ? <Loader /> : "Update User Profile"}
          </h1>
          <form onSubmit={formik.handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* First column: Username, Full Name, Company */}
            <div className='space-y-4'>
              <div>
                <input
                  type='text'
                  name='username'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Username'
                  className={`w-full px-3 py-2 border ${
                    formik.touched.username && formik.errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {formik.touched.username && formik.errors.username && (
                  <p className='text-red-500 text-sm'>{formik.errors.username}</p>
                )}
              </div>
              <div>
                <input
                  type='text'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Full Name'
                  className={`w-full px-3 py-2 border ${
                    formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className='text-red-500 text-sm'>{formik.errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type='text'
                  name='company'
                  value={formik.values.company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Company'
                  className={`w-full px-3 py-2 border ${
                    formik.touched.company && formik.errors.company ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {formik.touched.company && formik.errors.company && (
                  <p className='text-red-500 text-sm'>{formik.errors.company}</p>
                )}
              </div>
            </div>

            {/* Second column: Address, Phone */}
            <div className='space-y-4'>
              <div>
                <input
                  type='text'
                  name='address'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Address'
                  className={`w-full px-3 py-2 border ${
                    formik.touched.address && formik.errors.address ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className='text-red-500 text-sm'>{formik.errors.address}</p>
                )}
              </div>
              <div>
                <input
                  type='text'
                  name='phone'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Phone'
                  className={`w-full px-3 py-2 border ${
                    formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className='text-red-500 text-sm'>{formik.errors.phone}</p>
                )}
              </div>

              {/* Admin Status Dropdown */}
              <div className='flex items-center space-x-4'>
                <select
                  name='role'
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  disabled={auth?.user?.isAdmin}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg'>
                  {auth?.user?.isAdmin ? (
                    <option value='admin'>Admin</option>
                  ) : (
                    <>
                      <option value='buyer'>Buyer</option>
                      <option value='seller'>Seller</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='col-span-2 bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300'>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
