import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useProject } from "../../hooks/useProject";
import { useUserDetailsMutation } from "../../hooks/useUserDetails";
import { IProject } from "../../types/project"; 
import { setSelectProject, setSelectProjectId } from "../../redux/projectSlice";

interface ProjectDropdownProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ProjectDropdownList: React.FC<ProjectDropdownProps> = ({ isOpen, setIsOpen }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId);
  const projectId = useSelector((state: RootState)=> state.project.selectedProjectId);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);



  const { useGetProjects, useGetProjectById } = useProject();
  const { data: projectData } = useGetProjects(workspaceId ?? undefined);
  const { getUserDetials } = useUserDetailsMutation();
  const { data: userDetails, isLoading } = getUserDetials;
  const dispatch = useDispatch()

  const ownedWorkspace = userDetails?.data?.workspaceOwn;
  
  const { data: selectedProject, isLoading: isProjectLoading, error: projectError } = useGetProjectById(selectedProjectId);
  // console.log("selected project details data projectData dropdown from redux", projectId);
  // console.log("selectedProject data", selectedProject)

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

  useEffect(() => {
    if (selectedProject && selectedProject?.data) {
      dispatch(setSelectProjectId(selectedProject.data._id));
      dispatch(setSelectProject(selectedProject?.data))
      setIsOpen(false);
    }
  }, [selectedProject, dispatch]);

  if (!isOpen) return null;

  const handleProjectSelect = async (projectId: string) => {
    setSelectedProjectId(projectId)
    // console.log("selected project is", projectId);
  };
  

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full mt-[22px] w-52 bg-[#1E1E1E] border border-[#2C2C2C] rounded-xs shadow-lg"
    >
      {/* Project List */}
      <div className="max-h-80 overflow-y-auto">
        {(projectData?.data ?? []).length > 0 ? (
          projectData?.data.map((project: IProject) => (
            <button
              key={project._id}
              onClick={() => handleProjectSelect(project._id)}
              className={`block w-full text-left px-4 py-3 text-sm text-white hover:bg-[#2E2E2E] cursor-pointer ${project._id === projectId ? "bg-[#0052cc57]" : " "}`}
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