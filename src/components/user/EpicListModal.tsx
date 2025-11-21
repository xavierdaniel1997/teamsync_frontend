import React from 'react';
import { ITask } from '../../types/task';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { IoRemoveCircleOutline } from 'react-icons/io5';

interface EpicListModalProps {
  epicDetails: ITask[];
  onSelectEpic: (epicId: string | null) => void;
  hasEpic: boolean
  projectColor: string;
}

const EpicListModal: React.FC<EpicListModalProps> = ({ epicDetails, onSelectEpic, hasEpic, projectColor }) => {
  console.log('epicDetails from the EpicListModal', epicDetails);

  return (
    <div className="bg-[#202020] border border-[#2C2C2C] w-64 rounded-sm shadow-lg ">
      <div className="relative px-3 py-2">
        <span className="absolute inset-y-0 left-6 top-1/2 transform -translate-y-1/2 flex items-center text-gray-400">
          <FiSearch size={16} />
        </span>
        <input
          type="text"
          placeholder="Search epics..."
          className="w-full bg-[#2A2A2A] text-sm text-white rounded-sm px-9 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        />
      </div>
      <div className="max-h-60 overflow-y-auto custom-scrollbar">
        
        {epicDetails?.length ? (
          epicDetails.map((epic) => (
            <div
              key={epic._id}
              className="flex items-center gap-3 px-4 py-2 hover:bg-[#2E2E2E] cursor-pointer"
              onClick={() => onSelectEpic(epic._id)}
            >
              <span>
                 <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L6 13H11L11 22L18 11H13L13 2Z" stroke={projectColor} stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
              </span>
              <p className="text-sm text-gray-200">{epic.taskKey}</p>
              <p className="text-sm text-gray-200 flex-1 truncate">{epic.title}</p>
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-400 text-center">No epics found</div>
        )}

        {hasEpic && (
          <div
            className="flex items-center gap-3 px-4 py-2 hover:bg-[#2E2E2E] cursor-pointer border-b border-[#2C2C2C]"
            onClick={() => onSelectEpic(null)}
          >
            <span>
              <IoRemoveCircleOutline size={20} className="text-red-500" />
            </span>
            <p className="text-sm text-gray-200">Unlink Epic</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EpicListModal;