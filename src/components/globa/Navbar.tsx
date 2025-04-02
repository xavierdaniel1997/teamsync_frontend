import React, { useState, useRef } from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LogoImage from "../../assets/teamsync-log.png";
import UserDropdownList from "./UserDropdownList";
import ProjectDropdownList from "../user/ProjectDropdownList";

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("User details from the navbar", user);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const projectDropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleProjectDropdown = () => {
    setProjectDropdownOpen((prev) => !prev);
    setDropdownOpen(false); // Close user dropdown if open
  };

  return (
    <nav className="bg-[#1E1E1E] text-white flex items-center justify-between py-3 px-6 fixed top-0 left-0 w-full z-10 border-b border-[#5A6060]">

      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10">
            <img src={LogoImage} alt="Logo" />
          </div>
          <span className="text-lg font-medium text-white">Teamsync</span>
        </div>

        {!isAdmin && (
          <div className="flex items-center space-x-6">
            <div className="relative" ref={projectDropdownRef}>
              <div
                className="text-white text-sm hover:text-blue-400 cursor-pointer"
                onClick={toggleProjectDropdown}
              >
                Project
              </div>
              <ProjectDropdownList
                isOpen={isProjectDropdownOpen}
                setIsOpen={setProjectDropdownOpen}
              />
            </div>
            <a href="#" className="text-white text-sm hover:text-blue-400">
              Team
            </a>
            <a href="#" className="text-white text-sm hover:text-blue-400">
              Plan
            </a>
          </div>
        )}
      </div>

      {/* Right Side: Icons & Avatar */}
      <div className="flex items-center gap-5 relative" ref={dropdownRef}>
        <FiBell className="text-lg text-gray-500 hover:text-blue-400 cursor-pointer" />
        <FiSettings className="text-lg text-gray-500 hover:text-blue-400 cursor-pointer" />

        {/* Avatar (Click to open dropdown) */}
        <button onClick={toggleDropdown} className="relative flex items-center  focus:outline-none">
          <div className="w-8 h-8 bg-gray-500 rounded-full cursor-pointer"></div> 
        </button>

        {/* Dropdown Component */}
        <UserDropdownList isOpen={isDropdownOpen} setIsOpen={setDropdownOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
