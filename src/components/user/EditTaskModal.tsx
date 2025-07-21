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
  openTaskModal: () => void;
}
const EditTaskModal: React.FC<EditTaskModalProps> = ({ taskType,
  taskId,
  taskName,
  sprintId,
  workspaceId,
  projectId,
  closeOpenEditTaskModal,
  openTaskModal
}) => {

  const [showSprintList, setShowSprintList] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { useUpdateTask, useDeleteTask } = useProject();

  const handleMoveTask = (sprintId: string | null) => {
    if (workspaceId && projectId && taskId) {
      const formData = new FormData();
      console.log("from handleMoveTask sprintId checking", sprintId );
      formData.append("sprint", sprintId || "");
      useUpdateTask.mutate({
        workspaceId: workspaceId,
        projectId: projectId,
        taskId,
        // task: { sprint: newSprintId }
        task: formData,
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

  const handleEditTask = () => {
    openTaskModal()
    closeOpenEditTaskModal();
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
                onClick={handleEditTask}
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
                onClick={handleEditTask}
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
        message={`Are you sure you want to delete sprint SCRUM ${taskName}? it will be permanently removed.`}
      />
    </>
  )
}

export default EditTaskModal