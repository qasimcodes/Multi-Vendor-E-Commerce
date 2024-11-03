import { Link } from "react-router-dom";

const P404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg md:text-xl mb-8">
        Sorry, the page you're looking for doesn't exist.
      </p>

      <Link to="/"
        className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full hover:bg-purple-600 hover:text-white transition duration-300"
      > Go Back Home</Link>

      {/* Dinosaur Animation */}
      <div className="relative w-48 h-48 mt-6">
        <div className="absolute top-0 left-0 animate-bounce">
          {/* Dinosaur Body */}
          <div className="relative">
            <div className="bg-green-500 w-32 h-32 rounded-full"></div>
            {/* Tail */}
            <div className="absolute bg-green-500 w-12 h-6 rounded-full rotate-45 -bottom-2 left-20"></div>
            {/* Eye */}
            <div className="absolute w-6 h-6 bg-white rounded-full top-8 left-20">
              <div className="bg-black w-2 h-2 rounded-full m-auto mt-2"></div>
            </div>
          </div>
        </div>

        {/* Tears Animation */}
        <div className="absolute top-12 left-28">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping mb-2"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-100"></div>
        </div>
      </div>

     

      <div className="absolute bottom-10 w-full text-center">
        <p className="text-sm"> Multi- Vendor © 2024 Your Website. All rights reserved.</p>
      </div>
    </div>
  );
};

export default P404;
