import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../../components/globa/BreadCrumb';
import BackLogTopBar from '../../../components/user/BackLogTopBar';
import EpicSection from '../../../components/user/EpicSection';
import SprintSection from '../../../components/user/SprintSection';
import BacklogSection from '../../../components/user/BacklogSection';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useProject } from '../../../hooks/useProject';
import { ISprint } from '../../../types/sprint';

const Backlog: React.FC = () => {
  const [showEpic, setShowEpic] = useState(true);
  const { useGetEpic, useGetSprints, useGetBacklogTasks } = useProject();
  const [selectedEpicId, setSelectedEpicId] = useState<string | null>(null);

  const projectId = useSelector((state: RootState) => state.project.selectedProjectId)
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId)
  const project = useSelector((state: RootState) => state.project.selectedProject)
  const { data: epicData, isLoading } = useGetEpic(projectId || "")
  const {data: backlogData, isLoading: backlogLoading} = useGetBacklogTasks(projectId || "")
  const { data: sprintData, isLoading: sprintLoading } = useGetSprints(projectId || "")
  const epicTitle = epicData?.data

  useEffect(() => {
    if (epicData?.data && epicData.data.length > 0 && !selectedEpicId) {
      const firstEpicId = epicData.data[0]?._id;
      if (firstEpicId) {
        setSelectedEpicId(firstEpicId);
      }
    }
  }, [epicData, selectedEpicId]);

  // console.log("backlog details  form the backlogaaaaaaaaaaaaaaaa", project)

  return (
    <div className="p-5 bg-[#191919] min-h-screen">
      <div className='m-5'>
      <BreadCrumb
        pageName="Backlog"
        buttonText="Add Member"
        isBackLog={true}
      />
      </div>
      <BackLogTopBar showEpic={showEpic} setShowEpic={setShowEpic} projectMembers={project?.members}/>
      <div className="flex p-4">
        {showEpic && <EpicSection isLoading={isLoading} showEpic={showEpic} setShowEpic={setShowEpic} epicHeading={epicTitle}
          selectedEpicId={selectedEpicId}
          setSelectedEpicId={setSelectedEpicId}
        />}
        <div className="flex-1 ml-4 space-y-4">
          {sprintData?.data?.map((sprint: ISprint, index: number) => (
            <SprintSection key={sprint._id} sprintName={sprint.sprintName} sprintOrder={index} sprintId={sprint._id} workspaceId={workspaceId || ""} projectId={projectId || ""} epicId={selectedEpicId || ""}/>
          ))}
          <BacklogSection epicId={""} backlogTasks={backlogData?.data} backlogLoading={backlogLoading}/>
        </div>
      </div>
    </div>
  );
};

export default Backlog;
