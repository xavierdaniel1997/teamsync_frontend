import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { BiBug } from 'react-icons/bi';
import { BsBookmarkCheck } from 'react-icons/bs';

interface TaskInputProps {
  onCancel: () => void;
}

const issueTypes = [
    { id: 'story', label: 'Story', icon: <BsBookmarkCheck className="text-green-400" /> },
  { id: 'bug', label: 'Bug', icon: <BiBug className="text-red-400" /> },
];

const TaskInput: React.FC<TaskInputProps> = ({ onCancel }) => {
  const [title, setTitle] = useState('');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(issueTypes[0]);

  const inputRef = useRef<HTMLDivElement>(null);

  // Detect outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        onCancel();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title.trim()) {
      console.log('Creating issue:', { title, type: selectedType.id });
      setTitle('');
      onCancel();
    }

    if (e.key === 'Escape') {
      onCancel();
    }
  };

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
