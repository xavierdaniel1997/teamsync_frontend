import React from "react";
import { FiBell, FiSettings, FiChevronDown } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LogoImage from '../../assets/teamsync-log.png'

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin }) => {
  const user = useSelector((state: RootState) => state.auth.user)
  console.log("user detials from the navbar", user)
  return (
    <nav className="bg-[#1E1E1E] text-white flex items-center justify-between py-3 px-6 fixed top-0 left-0 w-full z-10 border-b  border-[#5A6060]">
      {/* Left Side: Brand & Navigation Links */}
      <div className="flex items-center space-x-10">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10">
            <img src={LogoImage}/>
            </div> 
          <span className="text-lg font-medium text-white">Teamsync</span>
        </div>

        {/* Navigation Links */}
        {!isAdmin &&
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
        </div>}
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
