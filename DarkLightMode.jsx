import React, { useState, useEffect } from 'react';
import { GiGooeyEyedSun } from "react-icons/gi";
import { HiLightBulb, HiOutlineLightBulb  } from "react-icons/hi2";
import { BsFillMoonStarsFill } from "react-icons/bs";

const DarkLightModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center p-1 bg-gray-300 dark:bg-indigo-800 rounded-full transition duration-300"
    >
      {isDarkMode ? (
        <HiOutlineLightBulb className="h-7 w-7 text-yellow-500 hover:text-yellow-300" />
      ) : (
        <HiLightBulb className="h-7 w-7 text-yellow-600 hover:text-orange-400 dark:text-white" />
      )}
    </button>
  );
};

export default DarkLightModeToggle;
