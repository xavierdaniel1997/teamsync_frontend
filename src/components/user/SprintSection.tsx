import React, { useState } from 'react';
import sprintLogo from "../../assets/sprintLogo.png"
import TaskInput from './TaskInput';
import TaskDropDown from './TaskDropDown';
import { useProject } from '../../hooks/useProject';
import { TaskShimmerList } from './TaskShimmer';
import TaskCard from './TaskCard';
import { PiDotsThreeBold } from 'react-icons/pi';
import { useDroppable } from '@dnd-kit/core';
import { ITask } from '../../types/task';
import StartSprintModal from './StartSprintModal';


interface SprintSectionProps {
  sprintName: string;
  sprintOrder: number;
  sprintStatus: string;
  sprintId: string;
  workspaceId: string;
  projectId: string;
  epicId?: string;
  tasks: ITask[];
}

const SprintSection: React.FC<SprintSectionProps> = ({ sprintName, sprintOrder, sprintStatus, sprintId, workspaceId, projectId, epicId, tasks}) => {
  const {useGetSprintTasks} = useProject()
  const [creatIssue, setCreateIssue] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);
  const [openStartSprintModal, setOpenStartSprintModal] = useState(false)
  const {useDeleteSprint} = useProject()
  


  const { isLoading } = useGetSprintTasks(
    workspaceId,
    projectId,
    sprintId
  );

  const { setNodeRef, isOver } = useDroppable({
    id: sprintId,
    data: { type: 'sprint', id: sprintId },
    disabled: sprintStatus === 'ACTIVE',
  });

   const handleDelete = (workspaceId: string, projectId: string, sprintId: string) => {
    if (!workspaceId && !projectId && !sprintId) {
      console.error('Error: sprintId is undefined or empty');
      return;
    }
    useDeleteSprint.mutate({workspaceId, projectId, sprintId})
  }


  

  const taskCount = tasks.length;
  // const totalStoryPoints = tasks.reduce((total, task) => total + (task.storyPoints || 0), 0) || 0;
  const todoCount = tasks.filter(task => task.status === 'TO_DO').length || 0;
  const inProgressCount = tasks.filter(task => task.status === 'IN_PROGRESS').length || 0;
  const doneCount = tasks.filter(task => task.status === 'DONE').length || 0;

  const handleOpenStartSprintModal = () => {
    setOpenStartSprintModal(true)
    console.log("handle open start sprint", openStartSprintModal)
  }


  return (
    <div 
    // className="bg-[#202020] rounded-md p-4 text-white"
    ref={setNodeRef}
      className={`drop-zone bg-[#202020] rounded-md p-4 text-white ${isOver ? 'over' : ''}`}
    
    >
      {/* Top Row */}
      <div className="flex justify-between items-center">
        {/* Left: Sprint title and controls */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="accent-gray-500" />
          <span className="font-medium">SCRUM {sprintName}</span>
          <span className="text-blue-400 text-sm cursor-pointer hover:underline">Add dates</span>
          <span className="text-gray-400 text-sm">({taskCount} issues)</span>
        </div>


        <div className="flex items-center gap-2">
          <span className="bg-gray-700 text-xs px-1.5 rounded-full">{todoCount}</span>
          <span className="bg-blue-600 text-xs px-1.5 rounded-full">{inProgressCount}</span>
          <span className="bg-green-600 text-xs px-1.5 rounded-full">{doneCount}</span>

          {sprintStatus==="PLANNED" ? <button
            disabled={tasks.length === 0}
            className={` bg-[#6f6f6f45] text-gray-500 px-3 py-1 text-sm rounded ${tasks.length > 0 ? " hover:bg-[#79787845] hover:text-gray-200" : "cursor-not-allowed" } `}
            onClick={handleOpenStartSprintModal}
          >
            Start sprint
          </button>: <button
          className='bg-[#6f6f6f45] text-gray-500 px-3 py-1 text-sm rounded-sm hover:bg-[#79787845] hover:text-gray-200'
          >Complete sprint</button>}

          <div className="relative">
            <button onClick={() => setShowDropdown(prev => !prev)}>
              <PiDotsThreeBold size={20} className="text-gray-400 cursor-pointer" />
            </button>
            {showDropdown && <TaskDropDown setShowDropdown={setShowDropdown} sprintName={sprintName} workspaceId={workspaceId} projectId={projectId} sprintId={sprintId} onDelete={handleDelete}/>}
          </div>
        </div>
      </div>

      <div className="mt-4">
      {isLoading ? (
        <TaskShimmerList count={3} />
      ): (
        tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
                key={task._id}
                task={task}
                taskType={"sprint"}
                containerId={sprintId}
              />
     
          ))
        ): (
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
        )
      )}

      </div>


      <div className="mt-1">
        {!creatIssue ? <button className="text-blue-400 text-sm hover:underline"
          onClick={() => setCreateIssue(true)}>+ Create issue</button> :
          <TaskInput onCancel={() => setCreateIssue(false)} sprintId={sprintId} sprintName={sprintName} workspaceId={workspaceId} projectId={projectId} epicId={epicId}/>}
      </div>

    
        <StartSprintModal
        isOpen={openStartSprintModal}
        onClose={() => setOpenStartSprintModal(false)}
        sprintName={sprintName}
        workspaceId={workspaceId}
        projectId={projectId}
        sprintId={sprintId}
        />
 
    </div>
  );
};

export default SprintSection;
