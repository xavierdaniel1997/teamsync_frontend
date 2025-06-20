import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { BiBug } from 'react-icons/bi';
import { BsBookmarkCheck } from 'react-icons/bs';
import { RiTaskLine } from "react-icons/ri";
import { useProject } from '../../hooks/useProject';
import { TaskType } from '../../types/task';


interface TaskInputProps {
  onCancel: () => void;
  sprintId?: string;
  sprintName?: string;
  workspaceId: string;
  projectId: string;
  epicId?: string;
}

const issueTypes = [
    { id: TaskType.STORY, label: 'Story', icon: <BsBookmarkCheck className="text-green-400" /> },
    { id: TaskType.TASK, label: 'Task', icon: <RiTaskLine className="text-blue-400" /> },
  { id: TaskType.BUG, label: 'Bug', icon: <BiBug className="text-red-400" /> },
];

const TaskInput: React.FC<TaskInputProps> = ({ onCancel, sprintId, workspaceId, projectId, epicId }) => {
  const [title, setTitle] = useState('');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(issueTypes[0]);
  const { useCreateTask } = useProject();

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        if(title.trim()){
          handleSubmit();
        }
        onCancel();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel, title]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title.trim()) {
      console.log('Creating issue:', { title, type: selectedType.id });
      setTitle('');
      onCancel();
      handleSubmit()
    }

    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleSubmit = () => {
    if (!title.trim()|| !projectId || !workspaceId) return;
    useCreateTask.mutate({
      title: title,
      project: projectId,
      workspace: workspaceId,
      // epic: epicId,
      sprint: sprintId ,
      type: selectedType.id,
      parent: epicId,
    })

  }

  return (
    <div ref={inputRef} className="relative p-2 rounded-sm border border-[#4C9AFF]">
      <div className="flex items-center space-x-2 relative">
        {/* Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setTypeDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-1 px-2 py-1"
          >
            {selectedType.icon}
            <FaChevronDown className="text-xs text-gray-300" />
          </button>

          {/* Dropdown List */}
          {typeDropdownOpen && (
            <div className="absolute z-10 mt-1 w-40 bg-gray-800 border border-gray-700 rounded shadow">
              {issueTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type);
                    setTypeDropdownOpen(false);
                  }}
                  className="flex items-center px-3 py-2 hover:bg-gray-700 cursor-pointer"
                >
                  <span className="mr-2">{type.icon}</span>
                  <span>{type.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe what needs to be done, paste a Confluence link, or search Confluence."
          className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400 text-sm"
          autoFocus
        />
      </div>
    </div>
  );
};

export default TaskInput;
