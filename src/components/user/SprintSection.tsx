import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import sprintLogo from "../../assets/sprintLogo.png"
import TaskInput from './TaskInput';

const SprintSection: React.FC = () => {
  const [creatIssue, setCreateIssue] = useState(false)

  return (
    <div className="bg-[#202020] rounded-md p-4 text-white">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        {/* Left: Sprint title and controls */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="accent-gray-500" />
          <span className="font-medium">SCRUM Sprint 1</span>
          <span className="text-blue-400 text-sm cursor-pointer hover:underline">Add dates</span>
          <span className="text-gray-400 text-sm">(0 issues)</span>
        </div>

        {/* Right: Status + Start Sprint */}
        <div className="flex items-center gap-2">
          <span className="bg-gray-700 text-xs px-1.5 rounded-full">0</span>
          <span className="bg-blue-600 text-xs px-1.5 rounded-full">0</span>
          <span className="bg-green-600 text-xs px-1.5 rounded-full">0</span>

          <button
            disabled
            className="bg-[#2c2f36] text-gray-500 px-3 py-1 text-sm rounded cursor-not-allowed"
          >
            Start sprint
          </button>

          <FaEllipsisH className="text-gray-400 cursor-pointer" />
        </div>
      </div>

      {/* Sprint Planning Box */}
      <div className="mt-4 border border-dashed border-gray-600 py-5 px-6 text-center text-gray-400 rounded-md">
        <div className="flex flex-col items-center justify-center">
          <img
            src={sprintLogo}
            alt="Plan Sprint"
            className="w-28 h-20 opacity-80 mb-2"
          />
          <p className="font-semibold text-white">Plan your sprint</p>
          <p>
            Drag issues from the <strong>Backlog</strong> section, or create new issues, to plan
            the work for this sprint. Select <strong>Start sprint</strong> when you're ready.
          </p>
        </div>
      </div>

      {/* Create Issue */}
      <div className="mt-1">
        {/* <button className="text-blue-400 text-sm hover:underline">+ Create issue</button> */}
        {!creatIssue ? <button className="text-blue-400 text-sm hover:underline" 
        onClick={() => setCreateIssue(true)}>+ Create issue</button>: 
        <TaskInput  onCancel={() => setCreateIssue(false)}/>}
      </div>
    </div>
  );
};

export default SprintSection;
