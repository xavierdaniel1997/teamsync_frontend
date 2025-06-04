import React, { JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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
  sidebarWidth: number;
  adjustSidebarWidth: (width: number) => void;
}

const NavSideBar: React.FC<NavSideBarProps> = ({ isOpen, toggleSidebar, navItems, isAdmin, sidebarWidth,
  adjustSidebarWidth, }) => {
  const location = useLocation();
  const currentProject = useSelector((state: RootState) => state.project.selectedProject)
  // console.log("from the side bar current project ", currentProject)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      adjustSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <aside
      // className={`h-full border-r border-[#2E2E2E] ${isOpen ? 'w-64' : 'w-16'
      //   } bg-[#191919] text-gray-300 flex flex-col transition-all duration-300 relative`}
      className={`h-full border-r border-[#2E2E2E] bg-[#191919] text-gray-300 flex flex-col transition-all duration-300 relative`}
      style={{ width: `${sidebarWidth}px` }}
    >
      {!isAdmin && isOpen && currentProject && (
        <div className="flex items-center p-4 border-b border-[#2E2E2E]">
          {currentProject?.projectCoverImg ? <img className="w-8 h-8 rounded object-cover" src={currentProject?.projectCoverImg} /> : <div className="w-8 h-8 bg-gray-500 rounded"></div>}

          <div className="ml-3">
            <span className="text-sm font-medium text-white">{currentProject?.name}</span>
            <span className="text-xs text-gray-500 block">{currentProject?.title}</span>
          </div>
        </div>
      )}


      <button
        // onClick={toggleSidebar}
        onClick={(e) => {
          e.stopPropagation(); // Prevent click event from propagating to parent elements
          toggleSidebar();
        }}
        className="absolute cursor-pointer top-5 -right-2 bg-[#2E2E2E] rounded-full shadow-md p-0.5 text-white hover:bg-[##2E2E2E]"
      >
        {isOpen ? <FiChevronLeft size={15} /> : <FiChevronRight size={15} />}
      </button>

      <div
        className="absolute top-0 right-0 w-1 h-full bg-transparent hover:bg-[#60A5FA] cursor-col-resize"
        onMouseDown={handleMouseDown}
      />

      <div className="flex-1 px-4 py-6">
        {/* {isOpen && (
          <div className="text-xs font-semibold text-gray-500 uppercase mb-4">Planning</div>
        )} */}
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center ${isOpen ? 'px-4' : 'px-0 justify-center'
                  } py-2 text-sm rounded transition-colors duration-200 hover:text-white ${location.pathname === item.path
                    ? 'bg-[#0052cc57]  text-white '
                    : 'text-gray-400 hover:bg-[#1e1e1e]'
                  }`}
              >
                <span
                  className={`${location.pathname === item.path ? 'text-white' : 'text-gray-500'
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