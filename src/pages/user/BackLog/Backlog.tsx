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
import { ITask } from '../../../types/task';
import { DndContext, closestCenter, DragEndEvent, DragStartEvent, DragOverlay, useSensors, MouseSensor, useSensor, TouchSensor } from '@dnd-kit/core';
import TaskDragPreview from '../../../components/user/TaskDragPreview';
import { toast } from 'sonner';
import { IUser } from '../../../types/users';

const Backlog: React.FC = () => {
  const [showEpic, setShowEpic] = useState(true);
  const { useGetEpic, useGetSprints, useGetBacklogTasks, useUpdateTask, useGetTasksByProject } = useProject();
  const [selectedEpicId, setSelectedEpicId] = useState<string | null>(null);
  const [draggedTask, setDraggedTask] = useState<ITask | null>(null);
  const [localTasks, setLocalTasks] = useState<ITask[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedEpics, setSelectedEpics] = useState<string[]>([])

  const projectId = useSelector((state: RootState) => state.project.selectedProjectId);
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId);
  const project = useSelector((state: RootState) => state.project.selectedProject);
  const { data: epicData, isLoading } = useGetEpic(projectId || "");
  const { isLoading: backlogLoading } = useGetBacklogTasks(projectId || "",);
  const { data: sprintData } = useGetSprints(projectId || "");
  const epicTitle = epicData?.data;
  const { data: taskData } = useGetTasksByProject(workspaceId || "", projectId || "", selectedUserIds, selectedEpics);

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

  useEffect(() => {
    if (taskData?.data) {
      setLocalTasks(taskData.data);
    }
  }, [taskData]);

  useEffect(() => {
    if (epicData?.data && epicData.data.length > 0 && !selectedEpicId) {
      const firstEpicId = epicData.data[0]?._id;
      if (firstEpicId) {
        setSelectedEpicId(firstEpicId);
      }
    }
  }, [epicData, selectedEpicId]);

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const allTasks = taskData?.data;
    const task = allTasks?.find((t) => t._id === taskId);
    setDraggedTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedTask(null);
    if (!over) return;

    const taskId = active.id as string;
    const sourceContainerId = active.data.current?.containerId as string;
    const destinationContainerId = over.id as string;

    if (sourceContainerId === destinationContainerId) return;

    const sourceSprint = sprintData?.data?.find((sprint: ISprint) => sprint._id === sourceContainerId);
    if (sourceSprint?.status === 'ACTIVE') {
      toast.error('Cannot move tasks from an active sprint');
      return;
    }

    const destinationSprint = sprintData?.data?.find((sprint: ISprint) => sprint._id === destinationContainerId);
    if (destinationSprint?.status === 'ACTIVE') {
      toast.error('Cannot move tasks to an active sprint');
      return;
    }


    const isBacklog = destinationContainerId === 'backlog';
    const sprintId = isBacklog ? null : destinationContainerId;

    setLocalTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, sprint: sprintId } : task
      )
    );

    if (workspaceId && projectId) {
      const formData = new FormData();
      if (sprintId) formData.append("sprint", sprintId);
      else formData.append("sprint", "");
      useUpdateTask.mutate(
        {
          workspaceId,
          projectId,
          taskId,
          // task: { sprint: sprintId },
          task: formData,
        },
      );
    }
  };

  const handleSelectUser = (userId: string, user: IUser) => {
    console.log("user detial of the member", userId, "and user", user)
    if (!project?.members?.some((member) => member.user._id === userId)) {
      console.warn(`Invalid user ID selected: ${userId}`);
      return;
    }
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectEpics = (epicId: string) => {
    if (!epicData?.data.some((epic: any) => epic._id === epicId)) {
      console.warn(`Invalid epic ID selected: ${epicId}`);
      return;
    }
    setSelectedEpics((prev) =>
      prev.includes(epicId) ? prev.filter((id) => id !== epicId) : [...prev, epicId]
    );
  };

  const sprintTasks = (sprintId: string) => localTasks.filter((task) => task.sprint === sprintId);
  const backlogTasks = localTasks.filter((task) => !task.sprint);


  // console.log("epic details.......................", epicTitle)

  return (
    <div className="p-5 bg-[#191919] min-h-[93vh] h-auto">
      <div className="m-5">
        <BreadCrumb
          pageName="Backlog"
          buttonText="Add Member"
          isBackLog={true}
        />
      </div>
      <BackLogTopBar
        showEpic={showEpic}
        setShowEpic={setShowEpic}
        projectMembers={project?.members}
        selectedUserIds={selectedUserIds}
        handleSelectUser={handleSelectUser}
        epicHeading={epicTitle}
        handleSelectedEpic={handleSelectEpics}
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex p-4">
          {showEpic && (
            <EpicSection
              isLoading={isLoading}
              showEpic={showEpic}
              setShowEpic={setShowEpic}
              epicHeading={epicTitle}
              selectedEpicId={selectedEpicId}
              setSelectedEpicId={setSelectedEpicId}
              selectedEpics={selectedEpics}
              handleSelectedEpic={handleSelectEpics}
            />
          )}
          <div className="flex-1 ml-4 space-y-4">
            {sprintData?.data?.map((sprint: ISprint, index: number) => (
              <SprintSection
                key={sprint._id}
                sprintName={sprint.sprintName}
                sprintStatus={sprint.status}
                sprintOrder={index}
                sprintId={sprint._id}
                workspaceId={workspaceId || ""}
                projectId={projectId || ""}
                epicId={""}
                tasks={sprintTasks(sprint._id)}
              />
            ))}
            <BacklogSection
              epicId={""}
              backlogTasks={backlogTasks}
              backlogLoading={backlogLoading}
            />
          </div>
        </div>
        <DragOverlay>
          {draggedTask ? <TaskDragPreview task={draggedTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Backlog;