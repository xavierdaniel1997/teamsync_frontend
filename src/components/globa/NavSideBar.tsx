import React, { JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface NavItem {
  icon: JSX.Element;
  text: string;
  path: string;
}

interface NavSideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  navItems: NavItem[];
  isAdmin: boolean;
}

const NavSideBar: React.FC<NavSideBarProps> = ({ isOpen, toggleSidebar, navItems, isAdmin }) => {
  const location = useLocation();

  return (
    <aside
      className={`h-full border-r-[3px] border-[#5A6060] ${
        isOpen ? 'w-64' : 'w-16'
      } bg-[#252B2B] text-gray-300 flex flex-col transition-all duration-300 relative`}
    >
      {!isAdmin && isOpen  && (
        <div className="flex items-center p-4 border-b border-gray-700">
          <div className="w-8 h-8 bg-gray-500 rounded"></div>
          <div className="ml-3">
            <span className="text-sm font-medium text-white">My Scrum Project</span>
            <span className="text-xs text-gray-500 block">Software project</span>
          </div>
        </div>
      )}


      <button
        onClick={toggleSidebar}
        className="absolute top-5 -right-3 bg-gray-700 rounded-full shadow-md p-0.5 text-white hover:bg-gray-600"
      >
        {isOpen ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
      </button>

      <div className="flex-1 px-4 py-6">
        {/* {isOpen && (
          <div className="text-xs font-semibold text-gray-500 uppercase mb-4">Planning</div>
        )} */}
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center ${
                  isOpen ? 'px-4' : 'px-0 justify-center'
                } py-2 text-sm rounded transition-colors duration-200 hover:text-white ${
                  location.pathname === item.path
                    ? 'bg-[#0052CC] text-white'
                    : 'text-gray-400 hover:bg-gray-700'
                }`}
              >
                <span
                  className={`${
                    location.pathname === item.path ? 'text-white' : 'text-gray-500'
                  } ${isOpen ? 'mr-6' : ''}`}
                >
                  {item.icon}
                </span>
                {isOpen && item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default NavSideBar;