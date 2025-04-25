import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import TaskInput from './TaskInput';

const BacklogSection: React.FC = () => {
  const [creatIssue, setCreateIssue] = useState(false)
  return (
    <div className=" rounded-md p-4 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Left: Backlog Title */}
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="accent-gray-500" />
          <FaChevronDown className="text-xs" />
          <span className="font-medium">Backlog</span>
          <span className="text-gray-400 text-sm">(0 issues)</span>
        </div>

        {/* Right: Estimate + Indicators + Create Sprint */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-400 text-sm">0 issues</span>
          <span className="text-gray-400 text-sm">Estimate: <strong>0</strong></span>

          {/* Status Indicators */}
          <div className="flex items-center space-x-1">
            <span className="bg-gray-700 text-xs px-1.5 rounded-full">0</span>
            <span className="bg-blue-600 text-xs px-1.5 rounded-full">0</span>
            <span className="bg-green-600 text-xs px-1.5 rounded-full">0</span>
            <span className="bg-gray-700 text-xs px-1.5 rounded-full">
              <svg className="inline w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5zM12 11a4 4 0 100-8 4 4 0 000 8zM6 20h5v-2a3 3 0 00-3-3H4a3 3 0 00-3 3v2h5z" />
              </svg>
            </span>
          </div>

          <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">
            Create sprint
          </button>
        </div>
      </div>

      {/* Empty Backlog Message */}
      <div className="mt-4 border border-dashed border-gray-600 py-5 text-center text-gray-400 rounded-md">
        Your backlog is empty.
      </div>

      {/* Create Issue */}
      <div className="mt-1">
        {!creatIssue ? <button className="text-blue-400 text-sm hover:underline" 
        onClick={() => setCreateIssue(true)}>+ Create issue</button>: 
        <TaskInput  onCancel={() => setCreateIssue(false)}/>}
      </div>
    </div>
  );
};

export default BacklogSection;
