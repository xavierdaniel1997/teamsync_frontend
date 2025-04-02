import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";

interface ProjectDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ProjectDropdownList: React.FC<ProjectDropdownProps> = ({ isOpen, setIsOpen }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const projects = [
    { id: 1, name: "Project Alpha" },
    { id: 2, name: "Project Beta" },
    { id: 3, name: "Project Gamma" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full mt-5 w-52 bg-[#1E1E1E] border border-[#5A6060] rounded-sm shadow-lg"
    >
      {/* Project List */}
      <div className="max-h-40 overflow-y-auto">
        {projects.length > 0 ? (
          projects.map((project) => (
            <button
              key={project.id}
              className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-[#2E2E2E]"
            >
              {project.name}
            </button>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-400">No projects available</div>
        )}
      </div>

      {/* Create Project Button */}
      <Link to="/create-project" onClick={() => setIsOpen(false)}>
        <div className="flex items-center gap-4 w-full px-4 py-3 text-sm text-white hover:bg-[#2E2E2E] border-t border-[#5A6060]">
          <span>Create Project</span>
          <IoAddSharp className="mr-2" /> 
        </div>
      </Link>
    </div>
  );
};

export default ProjectDropdownList;