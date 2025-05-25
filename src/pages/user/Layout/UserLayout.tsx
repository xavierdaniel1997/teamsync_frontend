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
  FiSettings,
} from 'react-icons/fi';
import { IoChatbubbleOutline } from 'react-icons/io5';


interface NavItem {
  icon: JSX.Element;
  text: string;
  path: string;
}

const UserLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const navItems: NavItem[] = [
    { icon: <FiGlobe />, text: 'Summary', path: '/project' },
    { icon: <FiLayers />, text: 'Backlog', path: '/project/backlog' },
    { icon: <FiCalendar />, text: 'Board', path: '/project/board' },
    { icon: <FiBell />, text: 'Notification', path: '/project/notifications' },
    { icon: <IoChatbubbleOutline />, text: 'Chat', path: '/chats' },
    // { icon: <FiEdit />, text: 'Teams & Members', path: '/project/team-members' },
    { icon: <FiTarget />, text: 'Projects', path: '/project/project-setting' },
    { icon: <FiSettings />, text: 'Settings', path: '/project/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 h-16 bg-white">
        <Navbar isAdmin={false}/>
      </div>

      <div className="flex">
        <div
          className={`fixed top-16 left-0 ${
            isSidebarOpen ? 'w-64' : 'w-16'
          } h-[calc(100vh-4rem)] transition-all duration-300`}
        >
          <NavSideBar
            isOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            navItems={navItems}
            isAdmin={false}
          />
        </div>

        <div
          className={`flex-1 transition-all duration-300 bg-[#202020] text-gray-300 ${
            isSidebarOpen ? 'ml-64' : 'ml-16'
          }  mt-16`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
