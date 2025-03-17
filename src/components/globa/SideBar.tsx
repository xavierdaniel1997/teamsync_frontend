import React from "react";
import {
  FiChevronDown,
  FiGlobe,
  FiClock,
  FiLayers,
  FiCalendar,
  FiList,
  FiEdit,
  FiTarget,
  FiAlertCircle
} from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

const SideBar = () => {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#252B2B] text-gray-300 flex flex-col">
      {/* Project Header */}
      <div className="flex items-center p-4 border-b border-gray-700">
        <div className="w-8 h-8 bg-gray-500 rounded"></div>
        <div className="ml-3">
          <span className="text-sm font-medium text-white">My Scrum Project</span>
          <span className="text-xs text-gray-500 block">Software project</span>
        </div>
        <FiChevronDown className="ml-auto text-gray-500" />
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6">
        <div className="text-xs font-semibold text-gray-500 uppercase mb-4">Planning</div>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white rounded">
              <FiGlobe className="mr-3 text-gray-500" />
              Summary
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white rounded">
              <FiClock className="mr-3 text-gray-500" />
              Timeline
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-white bg-[#0052CC] rounded">
              <FiLayers className="mr-3 text-gray-300" />
              Backlog
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white rounded">
              <FiCalendar className="mr-3 text-gray-500" />
              Calendar
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white rounded">
              <FiList className="mr-3 text-gray-500" />
              List
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white rounded">
              <FiEdit className="mr-3 text-gray-500" />
              Forms
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white rounded">
              <FiTarget className="mr-3 text-gray-500" />
              Goals
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white rounded">
              <FiAlertCircle className="mr-3 text-gray-500" />
              Issues
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-white rounded">
              <FaPlus className="mr-3 text-gray-500 text-xs" />
              Add view
            </a>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-500">You're in a team-managed project</div>
        <a href="#" className="text-xs text-blue-400 hover:underline mt-1 block">Learn more</a>
      </div>
    </aside>
  );
};

export default SideBar;
