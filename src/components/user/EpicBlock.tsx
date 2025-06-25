import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import TaskModal from './TaskModal';

interface EpicBlockProps {
  epicId: string;
  title: string;
  statusColor?: string;
  taskCount: number;
  isSelected: boolean;
  onSelect: () => void;
  selectedEpics: boolean;
  handleSelectedEpic: (epicId: string) => void
}

const EpicBlock: React.FC<EpicBlockProps> = ({ epicId, title, statusColor = '#323232', taskCount, onSelect, selectedEpics, handleSelectedEpic }) => {

  const [openEpicDetails, setOpenEpicDetails] = useState<boolean>(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const projectDetails = useSelector((state: RootState) => state.project.selectedProject)

  const handleViewDetails = () => {
    setIsTaskModalOpen(true);
  };


  return (
    <div className={`flex flex-col gap-3  text-white p-3 rounded-md hover:bg-[#2a2a2a] transition-colors cursor-pointer ${selectedEpics ? "bg-[#2a2a2a]" : "bg-[#1a1a1a]"}`} onClick={onSelect}>
      <div className="flex items-center gap-2" onClick={() => setOpenEpicDetails(!openEpicDetails)}>
        <button >
          {/* <FiChevronRight size={16} className="text-gray-300" /> */}
          {openEpicDetails ? <MdKeyboardArrowDown size={16} className="text-gray-300" /> : <FiChevronRight size={16} className="text-gray-300" />}
        </button>
        <div className="w-5 h-5 bg-purple-500 rounded-sm" onClick={() => handleSelectedEpic(epicId)}/>
        <span className="text-sm font-medium truncate">{title}</span>
      </div>
      {/* Status bar */}
      <div className="h-1 w-full rounded-sm" style={{ backgroundColor: statusColor }} />
      {openEpicDetails && <div className='flex flex-col gap-2 align-middle'>
        <div className='bg-[#202020] p-0.5 text-gray-400 rounded-sm'>
          <p>start date</p>
        </div>
        <button className='bg-[#202020] p-0.5 text-gray-400 rounded-sm cursor-pointer'
          onClick={handleViewDetails}>View Details</button>
      </div>}
      <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} epicTitle={title} taskCount={taskCount} epicId={epicId} members={projectDetails?.members as [] || []} />
    </div>
  );
};

export default EpicBlock;







{/* <TaskModal open={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} 
projectName={projectDetails?.name} projectMember={projectDetails?.members as [] | undefined}/> */}