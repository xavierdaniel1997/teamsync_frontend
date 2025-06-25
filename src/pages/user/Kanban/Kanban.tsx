import React, { useRef, useState } from 'react'
import { closestCenter, DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors, } from '@dnd-kit/core';
import BreadCrumb from '../../../components/globa/BreadCrumb'
import BackLogTopBar from '../../../components/user/BackLogTopBar'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import KanbanColumn from './KanbanColumn';
import { useProject } from '../../../hooks/useProject';
import { ITask, TaskStatus } from '../../../types/task';

const taskStatus = [{ _id: "TO_DO", status: "TO_DO" }, { _id: "IN_PROGRESS", status: "IN_PROGRESS" }, { _id: "IN_REVIEW", status: "IN_REVIEW" }, { _id: "DONE", status: "DONE" }]



const Kanban: React.FC = () => {
  const [showEpic, setShowEpic] = useState<boolean>(true);
  const boardRef = useRef<HTMLDivElement>(null);
  const project = useSelector((state: RootState) => state.project.selectedProject)
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId)
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId)
  const { useGetActiveSprintTask, useUpdateTask } = useProject();
  const { data: activeTask, isLoading: taskLoading } = useGetActiveSprintTask(workspaceId || "", projectId || "")
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);


  const handleSelectUser = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };


  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );



  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const task = active.data.current?.task as ITask;
    const newStatus = over.data.current?.id as TaskStatus;

    if (!task || !newStatus || task.status === newStatus) return;


    if (workspaceId && projectId) {
      useUpdateTask.mutate({
        workspaceId: workspaceId,
        projectId: projectId,
        taskId: task._id,
        task: { status: newStatus }
      })
    }

  }


  return (
    <div className="p-5 bg-[#191919] min-h-[93vh] h-auto">
      <div className='m-5'>
        <BreadCrumb
          pageName="SCRUM board"
          buttonText="Add Member"
          isBackLog={true}
        />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <BackLogTopBar
          showEpic={showEpic}
          setShowEpic={setShowEpic}
          projectMembers={project?.members}
          selectedUserIds={selectedUserIds}
          handleSelectUser={handleSelectUser}
        />
        <div className='p-5'>
          <div ref={boardRef} className='flex w-full gap-5' >

            {!activeTask || !activeTask.data ? (
              <>
                {taskStatus.map((column: any) => (<KanbanColumn key={column._id} status={column.status} taskLoading={taskLoading} />))}
              </>
            ) : (<>
              {activeTask.data.map((column: any) => (
                <KanbanColumn status={column.status} task={column?.tasks} />
              ))}
            </>)}


          </div>
        </div>
      </DndContext>
    </div>
  )
}

export default Kanban