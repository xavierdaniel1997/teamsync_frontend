import React, { useState } from 'react'
import SprintListModal from './SprintListModal';
import { useProject } from '../../hooks/useProject';
import ConfirmModal from './ConfirmModal';

interface EditTaskModalProps {
  taskType: string;
  taskId: string;
  taskName: string;
  sprintId?: string | null;
  workspaceId: string;
  projectId: string;
  closeOpenEditTaskModal: () => void;
}
const EditTaskModal: React.FC<EditTaskModalProps> = ({ taskType,
  taskId,
  taskName,
  sprintId,
  workspaceId,
  projectId,
  closeOpenEditTaskModal
}) => {

  const [showSprintList, setShowSprintList] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { useUpdateTask, useDeleteTask } = useProject();

  const handleMoveTask = (newSprintId: string | null) => {
    if (workspaceId && projectId && taskId) {
      useUpdateTask.mutate({
        workspaceId: workspaceId,
        projectId: projectId,
        taskId,
        task: { sprint: newSprintId }
      })
    }
  };

  const handleDeleteTask = () => {
    setIsConfirmModalOpen(true)
  }

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false)
  }

  const handleConfirmDelete = () => {
    if (workspaceId && projectId && taskId) {
      useDeleteTask.mutate({
        workspaceId, projectId, taskId
      },
        {
          onSuccess: () => {
            setIsConfirmModalOpen(false);
            closeOpenEditTaskModal();
          }
        }
      )
    }
  }

  return (
    <>
      <div
        className="absolute right-0 mt-2 w-48 bg-[#202020] border border-[#2C2C2C] rounded-sm z-10 text-sm"
      >
        <ul className="py-1 text-white">
          {taskType === 'backlog' ? (
            <>
              <li
                className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer"
                onClick={() => setShowSprintList(true)}
              >
                Move to Sprint
              </li>
              <li
                className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer"
              // onClick={handleEditTask}
              >
                Edit Backlog Task
              </li>
              <li
                className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer"
                onClick={handleDeleteTask}
              >
                Delete Task
              </li>
            </>
          ) : (
            <>
              <li
                className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer"
                onClick={() => setShowSprintList(true)}
              >
                Move to Another Sprint
              </li>
              <li
                className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer"
                onClick={() => handleMoveTask(null)}
              >
                Move to Backlog
              </li>
              <li
                className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer"
              // onClick={handleEditTask}
              >
                Edit Sprint Task
              </li>
              <li
                className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer"
                onClick={handleDeleteTask}
              >
                Delete Task
              </li>
            </>
          )}
        </ul>
        {showSprintList && (
          <div className="absolute right-full top-0 w-48 bg-[#202020] border border-[#2C2C2C] rounded-sm z-20">
            <SprintListModal
              workspaceId={workspaceId}
              projectId={projectId}
              currentSprintId={sprintId}
              onSelectSprint={handleMoveTask}
              onClose={() => setShowSprintList(false)}
            />
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete sprint"
        message={`Are you sure you want to delete sprint SCRUM ${taskName}?`}
      />
    </>
  )
}

export default EditTaskModal