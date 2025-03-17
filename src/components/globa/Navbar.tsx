import React from "react";
import { FiBell, FiSettings, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-[#252B2B] text-white flex items-center justify-between py-3 px-6 fixed top-0 left-0 w-full z-10">
      {/* Left Side: Brand & Navigation Links */}
      <div className="flex items-center space-x-6">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div> {/* Placeholder for Brand Icon */}
          <span className="text-lg font-medium text-white">Techstyles</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="#" className="text-white text-sm flex items-center space-x-1 hover:text-blue-400">
            <span>Project</span> <FiChevronDown className="text-xs" />
          </a>
          <a href="#" className="text-white text-sm flex items-center space-x-1 hover:text-blue-400">
            <span>Team</span> <FiChevronDown className="text-xs" />
          </a>
          <a href="#" className="text-white text-sm flex items-center space-x-1 hover:text-blue-400">
            <span>Plan</span> <FiChevronDown className="text-xs" />
          </a>
        </div>
      </div>

      {/* Right Side: Icons & Avatar */}
      <div className="flex items-center space-x-6">
        <FiBell className="text-lg text-gray-500 hover:text-blue-400 cursor-pointer" />
        <FiSettings className="text-lg text-gray-500 hover:text-blue-400 cursor-pointer" />

        {/* Avatar & User Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-500 rounded-full"></div> {/* User Avatar */}
          <div>
            <span className="text-sm font-medium text-white">Stephan Williams</span>
            <span className="text-xs text-gray-500 block">Welcome back!</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
