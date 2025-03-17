import React from 'react';
import Navbar from '../../../components/globa/Navbar';
import SideBar from '../../../components/globa/SideBar';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar - Fixed at the top without shadow */}
      <div className="fixed top-0 left-0 w-full z-50 h-16 bg-white">
        <Navbar />
      </div>

      {/* Main layout with Sidebar and Content */}
      <div className="flex">
        {/* Sidebar - Fixed on the left below Navbar */}
        <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#252B2B]">
          <SideBar />
        </div>

        {/* Main Content - Adjusted to avoid overlap */}
        <div className="flex-1 ml-64 p-6 mt-16">
          <h1 className="text-2xl font-bold">Dashboard Content</h1>
          {/* Add more content here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
