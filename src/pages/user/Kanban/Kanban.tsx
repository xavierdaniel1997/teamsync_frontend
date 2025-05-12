import React, { useState } from 'react'
import BreadCrumb from '../../../components/globa/BreadCrumb'
import BackLogTopBar from '../../../components/user/BackLogTopBar'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

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
      </div>
  )
}

export default Kanban