import React, { useState } from 'react';
import { useProject } from '../../hooks/useProject';
import { TaskType } from '../../types/task';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IoMdClose } from "react-icons/io";
import epicLogo from "../../assets/epicLogo.svg";
import EpicBlock from './EpicBlock';
import EpicBlockShimmer from './EpicBlockShimmer';

interface Props {
  isLoading?: boolean;
  epicHeading?: { _id: string; title: string; taskKey?: number }[];
  showEpic: boolean;
  setShowEpic: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEpicId: string | null;
  setSelectedEpicId: React.Dispatch<React.SetStateAction<string | null>>;
}

const EpicSection: React.FC<Props> = ({ isLoading, showEpic, setShowEpic, epicHeading, selectedEpicId,
  setSelectedEpicId, }) => {

  const { useCreateTask } = useProject();
  const [isCreating, setIsCreating] = useState(false);
  const [epicTitle, setEpicTitle] = useState('');
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId)
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId);


  const handleCreateEpic = async () => {
    if (!epicTitle.trim() || !projectId || !workspaceId) return;
    useCreateTask.mutate({
      title: epicTitle,
      type: TaskType.EPIC,
      project: projectId,
      workspace: workspaceId
    })
    setEpicTitle('');
    setIsCreating(false);
  };

  // console.log("poject Id details form the epicSection..........", epicHeading) 

  return (
    <div className="w-64 bg-[#202020] p-4 rounded shadow h-96 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-white">Epic</span>
        <button className="cursor-pointer" onClick={() => setShowEpic(!showEpic)}>
          <IoMdClose className="text-white" size={16} />
        </button>
      </div>

      {/* Scrollable Epic Content */}
      <div className="flex-1 overflow-auto pr-0.5 custom-scrollbar">

        {isLoading ? (
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, index) => (
              <EpicBlockShimmer key={index} />
            ))}
          </div>
        ) : (epicHeading ?? []).length > 0 ? (
          <div className="flex flex-col gap-1">
            {epicHeading?.map((epic) => (
              <EpicBlock key={epic._id} title={epic.title} epicId={epic._id} taskCount={epic.taskKey ?? 0} 
              isSelected={selectedEpicId === epic._id} 
                onSelect={() => setSelectedEpicId(epic._id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2 pt-2 items-center text-center">
            <img src={epicLogo} alt="Epic logo" className="w-20 h-20" />
            <p className="text-sm text-gray-400">
              Plan and prioritize large chunks of work.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Create your first epic to start capturing and breaking down work for your team.
            </p>
          </div>
        )}
      </div>

      {/* Footer - Create Button / Input */}
      <div className="mt-4">
        {isCreating ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="bg-[#2a2a2a] text-sm text-white px-2 py-1 rounded focus:outline-none"
              placeholder="What will be the epic called?"
              value={epicTitle}
              onChange={(e) => setEpicTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateEpic}
                className="px-3 py-1 bg-[#3F76FF] text-sm rounded hover:bg-blue-500"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEpicTitle('');
                }}
                className="px-3 py-1 bg-gray-600 text-sm rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            className="w-full px-3 py-1 bg-[#3F76FF] text-sm rounded hover:bg-blue-500"
            onClick={() => setIsCreating(true)}
          >
            + Create epic
          </button>
        )}
      </div>
    </div>

  );
};

export default EpicSection;
