import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import TaskModal from './TaskModal';
import { formatInTimeZone } from 'date-fns-tz';

interface EpicBlockProps {
  epicId: string;
  title: string;
  statusColor?: string;
  taskCount: number;
  isSelected: boolean;
  onSelect: () => void;
  selectedEpics: boolean;
  handleSelectedEpic: (epicId: string) => void
  taskDetails: any
}

const EpicBlock: React.FC<EpicBlockProps> = ({ epicId, title, statusColor = '#323232', taskCount, onSelect, selectedEpics, handleSelectedEpic, taskDetails }) => {

  const [openEpicDetails, setOpenEpicDetails] = useState<boolean>(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const projectDetails = useSelector((state: RootState) => state.project.selectedProject)

  const handleViewDetails = () => {
    setIsTaskModalOpen(true);
  };

  console.log("taskDetailsssssssssssssssssssssss taskDetails endDate projectDetails", projectDetails)


  return (
    <div className={`flex flex-col gap-3  text-white p-3 rounded-md hover:bg-[#2a2a2a] transition-colors cursor-pointer ${selectedEpics ? "bg-[#2a2a2a]" : "bg-[#1a1a1a]"}`} onClick={onSelect}>
      <div className="flex items-center gap-2">
        <button onClick={() => setOpenEpicDetails(!openEpicDetails)}>
          {/* <FiChevronRight size={16} className="text-gray-300" /> */}
          {openEpicDetails ? <MdKeyboardArrowDown size={16} className="text-gray-300" /> : <FiChevronRight size={16} className="text-gray-300" />}
        </button>
        <div className={`w-5 h-5 ${projectDetails?.color.class} rounded-sm`} onClick={() => handleSelectedEpic(epicId)} />
        <span className="text-sm font-medium truncate">{title}</span>
      </div>
      {/* Status bar */}
      <div className="h-1 w-full rounded-sm" style={{ backgroundColor: statusColor }} />
      {openEpicDetails && <div className='flex flex-col gap-2 align-middle'>
        {taskDetails.startDate && <div className='bg-[#202020] p-0.5 text-gray-400 rounded-sm text-center'>
          <p>{formatInTimeZone(new Date(taskDetails?.startDate), 'Asia/Kolkata', 'MMM d, yyyy')}</p>
        </div>}
        {taskDetails.endDate && <div className='bg-[#202020] p-0.5 text-gray-400 rounded-sm text-center'>
          <p>{formatInTimeZone(new Date(taskDetails?.endDate), 'Asia/Kolkata', 'MMM d, yyyy')}</p>
        </div>}
        <button className='bg-[#202020] p-0.5 font-semibold text-gray-400 rounded-sm cursor-pointer'
          onClick={handleViewDetails}>View Details</button>
      </div>}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        epicTitle={title}
        parentTask={title}
        taskCount={taskCount}
        epicId={epicId}
        reporter={taskDetails.reporter}
        isTask={false}
        members={projectDetails?.members as [] || []}
        taskId={epicId}
        task={taskDetails}
      />
    </div>
  );
};

export default EpicBlock;
