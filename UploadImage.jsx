import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import profile from "../../img/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../functions/toastify";
import ProfileUpload from '../../layouts/ProfileUpload';
import { useAuth } from "../../context/auth";
import Loader from "../../layouts/Loader";

const UploadImage = () => {
  const [auth, setAuth] = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(profile);

  /* useEffect */
  useEffect(() => {
    if (auth.user) {
      setImage(auth.user?.profileImage || null);
    }
  }, [auth.user]);

  /* hook */
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleProfileBtn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/update-profile", {
        profileImage,
      });
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""} flex h-screen`}>
      <Sidebar toggleDarkMode={toggleDarkMode} darkMode={darkMode} isAdmin={auth?.user?.isAdmin} />
      
      <form onSubmit={handleProfileBtn}>
        <div className='flex items-center justify-center w-full h-full p-4'>
          <div className='w-full max-w-4xl bg-slate-800 dark:bg-purple-300 p-6 rounded-lg shadow-lg flex'>
            {/* Left Side - Circular Image Preview */}
            <div className='w-1/2 flex items-center justify-center'>
              {loading ? (
                <Loader />
              ) : (
                <img
                  src={auth?.user?.profileImage || preview} // Placeholder image
                  alt='Preview'
                  className='w-80 h-80 rounded-full object-cover' // Circular shape
                />
              )}
            </div>
            {/* Right Side - Upload Options */}
            <div className='w-1/2 flex flex-col justify-center p-4'>
              <h1 className='text-3xl font-bold text-purple-100 mb-6 dark:text-purple-800 text-center'>
                Upload Profile Image
              </h1>
              <div className={`mb-4 ${darkMode ? "text-white" : "text-black"}`}>
              <ProfileUpload image={image} setImage={setImage} uploading={uploading} setUploading={setUploading} loading={loading} setLoading={setLoading} />
              </div>
              <button className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
                Upload Image
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadImage;
