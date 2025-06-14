import React, { useState, JSX, useEffect } from "react";
import Navbar from "../../../components/globa/Navbar";
import { data, Outlet } from "react-router-dom";
import NavSideBar from "../../../components/globa/NavSideBar";
import {
  FiGlobe,
  FiLayers,
  FiCalendar,
  FiBell,
  FiEdit,
  FiTarget,
  FiAlertCircle,
  FiSettings,
} from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { BsCameraVideo } from "react-icons/bs";
import { io, Socket } from "socket.io-client";
import { boolean, string } from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { disconnectSocket, initializeSocket } from "../../../config/socket";

interface NavItem {
  icon: JSX.Element;
  text: string;
  path: string;
}

const UserLayout: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.user?._id)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});
  const [sidebarWidth, setSidebarWidth] = useState<number>(256);

  const navItems: NavItem[] = [
    { icon: <FiGlobe />, text: "Summary", path: "/project" },
    { icon: <FiLayers />, text: "Backlog", path: "/project/backlog" },
    { icon: <FiCalendar />, text: "Board", path: "/project/board" },
    { icon: <FiTarget />, text: "Projects", path: "/project/project-setting" },
    { icon: <FiBell />, text: "Notification", path: "/project/notifications" },
    { icon: <IoChatbubbleOutline />, text: "Chat", path: "/project/chat" },
    { icon: <BsCameraVideo />, text: "Meetings", path: "/project/meeting" },
    { icon: <FiSettings />, text: "Settings", path: "/project/settings" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token || !userId) {
      console.error("No access token found in localStorage");
      return;
    }

    const socket = initializeSocket(token);
    if (!socket) return;

    socket.emit('register', userId)

    return () => {
      // disconnectSocket()
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
    }

  }, [userId]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setSidebarWidth(isSidebarOpen ? 64 : 256);
  };


  const adjustSidebarWidth = (width: number) => {
    setSidebarWidth(Math.max(64, Math.min(width, 400)));
    setIsSidebarOpen(width > 64);
  };


  return (
    <div className="bg-[#191919] flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 h-16">
        <Navbar isAdmin={false} />
      </div>

      <div className="flex">
        <div
          // className={`fixed top-16 left-0 ${
          //   isSidebarOpen ? "w-64" : "w-16"
          // } h-[calc(100vh-4rem)] transition-all duration-300`}
          className={`fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-300`}
          style={{ width: `${sidebarWidth}px` }}
        >
          <NavSideBar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            navItems={navItems}
            isAdmin={false}
            sidebarWidth={sidebarWidth}
            adjustSidebarWidth={adjustSidebarWidth}
          />
        </div>

        <div
          className={`flex-1 transition-all duration-300 bg-[#202020] text-gray-300 ${isSidebarOpen ? "ml-64" : "ml-16"
            }  mt-16`}
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
