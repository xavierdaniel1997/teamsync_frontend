import React, { useState } from 'react';
import { IoWarningOutline } from "react-icons/io5";

interface ProjectManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  onDelete: () => void;
}

const DeleteItemsModal: React.FC<ProjectManageModalProps> = ({
  isOpen,
  onClose,
  projectName,
  onDelete,
}) => {
  const [inputProjectName, setInputProjectName] = useState('');
  const [inputConfirmPhrase, setInputConfirmPhrase] = useState('');

  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    onDelete();
    setInputConfirmPhrase("")
    setInputProjectName("")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1F1F1F] p-6 rounded-lg max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
            <div className='bg-red-500/20 p-3 rounded-full'>
          <IoWarningOutline size={25} className="text-red-600/80 text-2xl" />
          </div>
          <h2 className="text-lg font-semibold text-gray-300">Delete project</h2>
        </div>
        <p className="text-gray-400 mb-4">
          Are you sure you want to delete project
           {projectName}
           ? All of the data related to the project will be permanently removed. This action cannot be undone.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Enter the project name {projectName} to continue:</label>
            <input
              type="text"
              className="w-full bg-[#2B2B2B] border border-[#333] px-2 py-1.5 rounded text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={inputProjectName}
              onChange={(e) => setInputProjectName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">To confirm, type "delete my project" below:</label>
            <input
              type="text"
              className="w-full bg-[#2B2B2B] border border-[#333] px-2 py-1.5 rounded text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={inputConfirmPhrase}
              onChange={(e) => setInputConfirmPhrase(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-3">
          <button
            className="px-3 py-1 bg-[#262626] text-gray-200 rounded hover:bg-[#333] transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`text-gray-400 tw-fit px-3 py-1 rounded-sm cursor-pointer ${inputProjectName === projectName && inputConfirmPhrase === "delete my project" ?  "bg-red-500/50" : "bg-red-300/50"} `}
            onClick={handleConfirmDelete}
            disabled={inputProjectName !== projectName && inputConfirmPhrase !== "delete my project"}
          >
            Delete project
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemsModal;