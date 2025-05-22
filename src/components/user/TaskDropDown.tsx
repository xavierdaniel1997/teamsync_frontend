import React, { useEffect, useState } from 'react';
import ConfirmModal from './ConfirmModal';

interface TaskDropDownProps {
  setShowDropdown: (show: boolean) => void;
  onMoveDown?: () => void;
  onMoveToBottom?: () => void;
  onEdit?: () => void;
  onDelete: (workspaceId: string, projectId: string, sprintId: string) => void;
  sprintName: string;
  workspaceId: string;
  projectId: string;
  sprintId: string;
}

const TaskDropDown: React.FC<TaskDropDownProps> = ({
  setShowDropdown,
  onMoveDown,
  onMoveToBottom,
  onEdit,
  onDelete,
  sprintName,
  workspaceId,
  projectId,
  sprintId
}) => {
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setShowDropdown(false);
  //     }
  //   };
    
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [setShowDropdown]);


  const handleMoveDown = () => {
    if (onMoveDown) onMoveDown();
    setShowDropdown(false);
  };

  const handleMoveToBottom = () => {
    if (onMoveToBottom) onMoveToBottom();
    setShowDropdown(false);
  };

  const handleEdit = () => {
    if (onEdit) onEdit();
    setShowDropdown(false);
  };

  const handleDeleteClick = () => {
    console.log('handleDeleteClick called, opening modal');
    setIsConfirmModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (onDelete) onDelete(workspaceId, projectId, sprintId);
    setIsConfirmModalOpen(false);
    setShowDropdown(false);
  };


  const handleCancelDelete = () => {
    console.log('handleCancelDelete called');
    setIsConfirmModalOpen(false);
  };

  return (
    <>
    <div 
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-48 bg-[#202020] border border-[#2C2C2C] rounded-sm z-10 text-sm"
    >
      <ul className="py-1 text-white">
        <li 
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={handleMoveDown}
        >
          Move sprint down
        </li>
        <li 
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={handleMoveToBottom}
        >
          Move sprint to bottom
        </li>
        <li 
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={handleEdit}
        >
          Edit sprint
        </li>
        <li 
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={handleDeleteClick}
        >
          Delete sprint
        </li>
      </ul>
    </div>
    <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete sprint"
        message={`Are you sure you want to delete sprint SCRUM ${sprintName}?`} 
      />
    </>
  );
};

export default TaskDropDown;