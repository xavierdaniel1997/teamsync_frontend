import React, { useState } from 'react'
import BreadCrumb from '../../../components/globa/BreadCrumb'
import BackLogTopBar from '../../../components/user/BackLogTopBar'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import KanbanColumn from './KanbanColumn';

const STATUS_COLUMNS = [
  { id: 'TO_DO', label: 'To Do', bgColor: 'bg-gray-700' },
  { id: 'IN_PROGRESS', label: 'In Progress', bgColor: 'bg-blue-600' },
  {id: "REVIEW", label: 'Review', bgColor: "bg-red-600"},
  { id: 'DONE', label: 'Done', bgColor: 'bg-green-600' },
] as const;

const Kanban: React.FC = () => {
  const [showEpic, setShowEpic] = useState<boolean>(true);
  const project = useSelector((state: RootState) => state.project.selectedProject)
  return (
    <div className="p-5 bg-[#191919] min-h-screen">
      <div className='m-5'>
         <BreadCrumb
        pageName="SCRUM board"
        buttonText="Add Member"
        isBackLog={true}
      />
      </div>
      <BackLogTopBar showEpic={showEpic} setShowEpic={setShowEpic} projectMembers={project?.members}/>
      <div className='p-5'>
        <div className='flex w-full gap-5'>
        {STATUS_COLUMNS.map((column) => (
          <KanbanColumn
          key={column.id}
                  status={column.id}
                  label={column.label}
                  bgColor={column.label}
          />
        ))}
        </div> 
      </div>
      </div>
  )
}

export default Kanban