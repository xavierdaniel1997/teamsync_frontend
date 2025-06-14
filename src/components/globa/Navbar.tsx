import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LogoImage from "../../assets/teamsync-log.png";
import UserDropdownList from "./UserDropdownList";
import ProjectDropdownList from "../user/ProjectDropdownList";
import { Link, useNavigate } from "react-router-dom";
import { getInitials, getRandomColor } from "../../utils/userHelpers";
import UserAvatar from "./UserAvatar";
import { initializeSocket } from "../../config/socket";
import { INotification } from "../../types/notification";
import { useNotifications } from "../../hooks/useNotifications";

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate()
  // console.log("User details from the navbar", user);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const {useGetNotifications} = useNotifications('unread')


  const { data: notificationData } = useGetNotifications;

  useEffect(() => {
    if (notificationData?.data) {
      setNotifications(notificationData.data);
    }
  }, [notificationData]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found in localStorage');
      return;
    }

    const socket = initializeSocket(token);
    if (!socket) return;

    socket.emit('register', user?._id);

    socket.on('notification', (notification: INotification) => {
      console.log('Received notification:', notification);
      setNotifications((prev) => {
        if (prev.some((n) => n._id === notification._id)) {
          return prev;
        }
        return [notification, ...prev];
      });
    });

    return () => {
      socket.off('notification');
    };
  }, [user?._id]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleProjectDropdown = () => {
    setProjectDropdownOpen((prev) => !prev);
    setDropdownOpen(false);
  };

  const navigateNotification = () => {
    navigate('/project/notifications')
  }

  return (
    <nav className="bg-[#191919] text-white flex items-center justify-between py-3 px-6 fixed top-0 left-0 w-full z-10 border-b border-[#2E2E2E]">

      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10">
            <img src={LogoImage} alt="Logo" />
          </div>
          <span className="text-lg font-medium text-white">Teamsync</span>
        </div>

        {!isAdmin && (
          <div className="flex items-center space-x-6">
            <Link to="/workspace-setting" className="text-white text-sm hover:text-blue-400">
              Workspaces
            </Link>
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
            <Link to="/subscriptions" className="text-white text-sm hover:text-blue-400">
              Plan
            </Link>
          </div>
        )}
      </div>

      {/* Right Side: Icons & Avatar */}
      <div className="flex items-center gap-5 relative" ref={dropdownRef}>

        <div className="relative"
        onClick={navigateNotification}>
        <FiBell className="text-lg text-gray-500 hover:text-blue-400 cursor-pointer" />
          {notifications.length > 0 && <div className="absolute bottom-2 left-2 bg-red-500/50 text-sm rounded-full px-1.5">
           {notifications.length}
          </div>}
        </div>
        <FiSettings className="text-lg text-gray-500 hover:text-blue-400 cursor-pointer" />

        {/* Avatar (Click to open dropdown) */}
        <button onClick={toggleDropdown} className="relative flex items-center  focus:outline-none">
          <UserAvatar user={user || undefined} getRandomColor={getRandomColor} getInitials={getInitials} />
        </button>

        {/* Dropdown Component */}
        <UserDropdownList isOpen={isDropdownOpen} setIsOpen={setDropdownOpen} />
      </div>
    </nav>
  );
};

export default Navbar;
