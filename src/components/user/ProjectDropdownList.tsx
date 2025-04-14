import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useProject } from "../../hooks/useProject";
import { useUserDetailsMutation } from "../../hooks/useUserDetails";
import { IProject } from "../../types/project"; 

interface ProjectDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ProjectDropdownList: React.FC<ProjectDropdownProps> = ({ isOpen, setIsOpen }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId);

  console.log("workspaceId", workspaceId);

  const { useGetProjects } = useProject();
  const { data: projectData } = useGetProjects(workspaceId ?? undefined);
  const { getUserDetials } = useUserDetailsMutation();
  const { data: userDetails, isLoading } = getUserDetials;

  const ownedWorkspace = userDetails?.data?.workspaceOwn;
  console.log("project details data projectData", projectData);

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

  const handleProjectSelect = (projectId: string) => {
    console.log("selected project is", projectId);
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full mt-[22px] w-52 bg-[#1E1E1E] border border-[#5A6060] rounded-sm shadow-lg"
    >
      {/* Project List */}
      <div className="max-h-80 overflow-y-auto">
        {(projectData?.data ?? []).length > 0 ? (
          projectData?.data.map((project: IProject) => (
            <button
              key={project._id}
              onClick={() => handleProjectSelect(project._id)}
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