import React, { useState, JSX } from 'react';
import Navbar from '../../../components/globa/Navbar';
import { Outlet } from 'react-router-dom';
import NavSideBar from '../../../components/globa/NavSideBar';
import {
  FiGlobe,
  FiLayers,
  FiCalendar,
  FiBell,
  FiEdit,
  FiTarget,
  FiAlertCircle,
} from 'react-icons/fi';
import { FaRegUser } from "react-icons/fa";
import { IoChatbubbleOutline } from 'react-icons/io5';


interface NavItem {
  icon: JSX.Element;
  text: string;
  path: string;
}

const UserLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const navItems: NavItem[] = [
    { icon: <FiGlobe />, text: 'Dashbaord', path: '/admin' },
    { icon: <FiLayers />, text: 'Workspaces', path: '/admin/companies' },
    {icon: <FaRegUser/>, text: 'Users', path: '/admin/user-details'},
    { icon: <FiCalendar />, text: 'Plans', path: '/admin/plans' },
    { icon: <FiBell />, text: 'Report', path: '/notifications' },
    { icon: <IoChatbubbleOutline />, text: 'Settings', path: '/chats' },
  ];

  return (
    <div className="min-h-screen  flex flex-col bg-[#1E1E1E]">
      <div className="fixed top-0 left-0 w-full z-50 h-16 bg-white">
        <Navbar isAdmin={true}/>
      </div>

      <div className="flex">
        <div
          className={`fixed top-16 left-0 ${
            isSidebarOpen ? 'w-64' : 'w-16'
          } h-[calc(100vh-4rem)] transition-all duration-300 bg-[#252B2B]`}
        >
          <NavSideBar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            navItems={navItems}
            isAdmin={true}
          />
        </div>

        <div
          className={`flex-1 transition-all duration-300 bg-[#1E1E1E] ${
            isSidebarOpen ? 'ml-64' : 'ml-16'
          } p-6 mt-16`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;