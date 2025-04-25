import React, { useState } from 'react';
import BreadCrumb from '../../../components/globa/BreadCrumb';
import BackLogTopBar from '../../../components/user/BackLogTopBar';
import EpicSection from '../../../components/user/EpicSection';
import SprintSection from '../../../components/user/SprintSection';
import BacklogSection from '../../../components/user/BacklogSection';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useProject } from '../../../hooks/useProject';

const Backlog: React.FC = () => {
  const [showEpic, setShowEpic] = useState(true);
  const { useGetEpic } = useProject();

  const projectId = useSelector((state: RootState) => state.project.selectedProjectId)
  const {data: epicData, isLoading} = useGetEpic(projectId || "")
  const epicTitle = epicData?.data


  return (
    <div className="p-5 bg-[#191919] min-h-screen text-white">
      <BreadCrumb
        pageName="Backlog"
        buttonText="Add Member"
        isBackLog={true}
      />
      <BackLogTopBar showEpic={showEpic} setShowEpic={setShowEpic} />
      <div className="flex p-5">
        {showEpic && <EpicSection isLoading={isLoading} showEpic={showEpic} setShowEpic={setShowEpic} epicHeading={epicTitle}/>}
        <div className="flex-1 ml-4 space-y-4">
          <SprintSection />
          <BacklogSection />
        </div>
      </div>
    </div>
  );
};

export default Backlog;
