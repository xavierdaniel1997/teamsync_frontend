import React, { useState } from 'react'
import BreadCrumb from '../../../components/globa/BreadCrumb'
import BackLogTopBar from '../../../components/user/BackLogTopBar'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import KanbanColumn from './KanbanColumn';
import { useProject } from '../../../hooks/useProject';
import { ITask, KanbanData, KanbanResponse, TaskStatus } from '../../../types/task';

 

const Kanban: React.FC = () => {
  const [showEpic, setShowEpic] = useState<boolean>(true);
  const project = useSelector((state: RootState) => state.project.selectedProject)
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId)
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId)
  const { useGetActiveSprintTask } = useProject();
  const { data: activeTask, isLoading: taskLoading } = useGetActiveSprintTask(workspaceId || "", projectId || "")

 

  if (taskLoading) {
    return <div>Loading tasks...</div>;
  }

  if (!activeTask || !activeTask.data) {
    return <div>No tasks available.</div>;
  }

  console.log("task details form the board", activeTask)
  return (
    <div className="p-5 bg-[#191919] min-h-screen">
      <div className='m-5'>
        <BreadCrumb
          pageName="SCRUM board"
          buttonText="Add Member"
          isBackLog={true}
        />
      </div>
      <BackLogTopBar showEpic={showEpic} setShowEpic={setShowEpic} projectMembers={project?.members} />
      <div className='p-5'>
        <div className='flex w-full gap-5'>
          {/* {STATUS_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              status={column.id}
              label={column.label}
              bgColor={column.label}
              tasks={activeTask.data[column.id] || []}
            />
          ))} */}

          {activeTask.data.map((column: any) => (
            <KanbanColumn status={column.status} task={column?.tasks}/> 
          ))}


        </div>
      </div>
    </div>
  )
}

export default Kanban