import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import sprintLogo from "../../assets/sprintLogo.png"
import TaskInput from './TaskInput';
import TaskDropDown from './TaskDropDown';
import { useProject } from '../../hooks/useProject';

interface SprintSectionProps {
  sprintName: string;
  sprintOrder: number;
  sprintId: string;
  workspaceId: string;
  projectId: string;
  epicId?: string;
}

const SprintSection: React.FC<SprintSectionProps> = ({ sprintName, sprintOrder, sprintId, workspaceId, projectId, epicId }) => {
  const [creatIssue, setCreateIssue] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);
  const {useDeleteSprint} = useProject()

  // console.log('SprintSection received sprintId:', sprintId);
  const handleDelete = (sprintId: string) => {
    console.log("this is form the handleDelete checking the sprintId", sprintId)
    if (!sprintId) {
      console.error('Error: sprintId is undefined or empty');
      return;
    }
    useDeleteSprint.mutate(sprintId)
  }


  return (
    <div className="bg-[#202020] rounded-md p-4 text-white">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        {/* Left: Sprint title and controls */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="accent-gray-500" />
          <span className="font-medium">SCRUM {sprintName}</span>
          <span className="text-blue-400 text-sm cursor-pointer hover:underline">Add dates</span>
          <span className="text-gray-400 text-sm">(0 issues)</span>
        </div>


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

          <div className="relative">
            <button onClick={() => setShowDropdown(prev => !prev)}>
              <FaEllipsisH className="text-gray-400 cursor-pointer" />
            </button>
            {showDropdown && <TaskDropDown setShowDropdown={setShowDropdown} sprintName={sprintName} sprintId={sprintId} onDelete={handleDelete}/>}
          </div>
        </div>
      </div>


      <div className="mt-4 border border-dashed border-gray-600 py-3 px-6 text-center text-gray-400 rounded-md">
        <div className="flex flex-col items-center justify-center">
          {sprintOrder === 0 &&
            <>
              <img
                src={sprintLogo}
                alt="Plan Sprint"
                className="w-28 h-20 opacity-80 mb-1"
              />
              <p className="font-semibold text-white">Plan your sprint</p>
            </>}
          <p>
            Drag issues from the <strong>Backlog</strong> section, or create new issues, to plan.
          </p>
        </div>
      </div>

      {/* Create Issue */}
      <div className="mt-1">
        {!creatIssue ? <button className="text-blue-400 text-sm hover:underline"
          onClick={() => setCreateIssue(true)}>+ Create issue</button> :
          <TaskInput onCancel={() => setCreateIssue(false)} sprintId={sprintId} workspaceId={workspaceId} projectId={projectId} epicId={epicId}/>}
      </div>
    </div>
  );
};

export default SprintSection;
