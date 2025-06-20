
import React from 'react';
import { useProject } from '../../hooks/useProject';
import { ISprint } from '../../types/sprint';

interface SprintListModalProps {
  workspaceId: string;
  projectId: string;
  currentSprintId?: string | null;
  onSelectSprint: (sprintId: string | null) => void;
  onClose: () => void;
}

const SprintListModal: React.FC<SprintListModalProps> = ({
  projectId,
  currentSprintId,
  onSelectSprint,
  onClose,
}) => {
  const { useGetSprints } = useProject();
  const { data: sprintData, isLoading } = useGetSprints(projectId);

  const handleSelect = (sprintId: string) => {
    onSelectSprint(sprintId);
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-[#202020] border border-[#2C2C2C] rounded-sm z-20 text-sm">
      <ul className="py-1 text-white">
        {isLoading ? (
          <li className="px-4 py-2 text-gray-400">Loading sprints...</li>
        ) : sprintData?.data?.length > 0 ? (
          sprintData.data
            .filter((sprint: ISprint) => sprint._id !== currentSprintId)
            .map((sprint: ISprint) => (
              <li
                key={sprint._id}
                className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer"
                onClick={() => handleSelect(sprint._id)}
              >
                {sprint.sprintName}
              </li>
            ))
        ) : (
          <li className="px-4 py-2 text-gray-400">No sprints available</li>
        )}
      </ul>
    </div>
  );
};

export default SprintListModal;
