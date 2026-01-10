import React, { useEffect, useRef, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import BreadCrumb from "../../../components/globa/BreadCrumb";
import BackLogTopBar from "../../../components/user/BackLogTopBar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import KanbanColumn from "./KanbanColumn";
import { useProject } from "../../../hooks/useProject";
import { IKanbanColumn, ITask, TaskStatus } from "../../../types/task";
import CompleteSprintModal from "../../../components/user/CompleteSprintModal";
import { ISprint } from "../../../types/sprint";
import { formatDate } from "../../../utils/formatDate";

const taskStatus = [
  { _id: "TO_DO", status: "TO_DO" },
  { _id: "IN_PROGRESS", status: "IN_PROGRESS" },
  { _id: "IN_REVIEW", status: "IN_REVIEW" },
  { _id: "DONE", status: "DONE" },
];

const Kanban: React.FC = () => {
  const [showEpic, setShowEpic] = useState<boolean>(true);
  const boardRef = useRef<HTMLDivElement>(null);
  const project = useSelector(
    (state: RootState) => state.project.selectedProject
  );
  const workspaceId = useSelector(
    (state: RootState) => state.workspace.selectWorkspaceId
  );
  const projectId = useSelector(
    (state: RootState) => state.project.selectedProjectId
  );

  const { useUpdateKanbanTask, useGetKanbanTasks, useGetEpic, useGetSprints } = useProject();
  const { data: epicData } = useGetEpic(projectId || "");

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedEpics, setSelectedEpics] = useState<string[]>([]);
  const [kanbanTasks, setKanbanTasks] = useState<any[]>([]);
  const [openCompleteSprintModal, setOpenCompleteSprintModal] = useState(false);

  const epicTitle = epicData?.data;
  const { data: activeTask, isLoading: taskLoading } = useGetKanbanTasks(
    workspaceId || "",
    projectId || "",
    selectedUserIds,
    selectedEpics
  );
  const { data: sprintData } = useGetSprints(projectId || "");

  
  const activeSprint = sprintData?.data?.find((sprint: ISprint) => sprint.status === "ACTIVE")



  const totalIssues = kanbanTasks.reduce(
  (sum, column) => sum + (column.tasks?.length || 0),
  0
);

const doneIssues = kanbanTasks
  .find((column) => column.status === TaskStatus.DONE)
  ?.tasks?.length || 0;

const notDoneIssues = totalIssues - doneIssues;


const assigneeSummary = React.useMemo(() => {
  const map = new Map<
    string,
    { userId: string; fullName: string; avatar: string; doneCount: number }
  >();

  kanbanTasks.forEach((column) => {
    if (column.status !== TaskStatus.DONE) return;

    column.tasks.forEach((task: ITask) => {
      if (!task.assignee || typeof task.assignee === 'string') return;

      const userId = task.assignee._id;
      const fullName = task.assignee.fullName;
      const avatar = task.assignee.avatar || '';

      if (!userId) return;

      if (!map.has(userId)) {
        map.set(userId, {
          userId,
          fullName,
          avatar,
          doneCount: 1,
        });
      } else {
        map.get(userId)!.doneCount += 1;
      }
    });
  });

  return Array.from(map.values());
}, [kanbanTasks]);

console.log("checking the active sprint tasks.........in the kanban board", assigneeSummary)

  // const { data: activeTask, isLoading: taskLoading } = useGetActiveSprintTask(workspaceId || "", projectId || "")
  // const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  useEffect(() => {
    if (activeTask?.data) {
      setKanbanTasks(activeTask.data);
    }
  }, [activeTask]);

  const handleSelectUser = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
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

    // Optimistically update local state
    setKanbanTasks((prevState) => {
      const newState = prevState.map((column) => {
        if (column.status === task.status) {
          return {
            ...column,
            tasks: column.tasks.filter((t: ITask) => t._id !== task._id),
          };
        } else if (column.status === newStatus) {
          return {
            ...column,
            tasks: [...column.tasks, { ...task, status: newStatus }],
          };
        }
        return column;
      });
      return newState;
    });

    // Trigger backend update
    useUpdateKanbanTask.mutate(
      {
        workspaceId: workspaceId!,
        projectId: projectId!,
        taskId: task._id,
        taskstatus: newStatus,
      },
      {
        // Revert if API fails
        onError: () => {
          setKanbanTasks((prevState) => {
            const reverted = prevState.map((column) => {
              if (column.status === newStatus) {
                return {
                  ...column,
                  tasks: column.tasks.filter((t: ITask) => t._id !== task._id),
                };
              } else if (column.status === task.status) {
                return {
                  ...column,
                  tasks: [...column.tasks, task],
                };
              }
              return column;
            });
            return reverted;
          });
        },
      }
    );
  };

  const handleSelectEpics = (epicId: string) => {
    if (!epicData?.data.some((epic: any) => epic._id === epicId)) {
      console.warn(`Invalid epic ID selected: ${epicId}`);
      return;
    }
    setSelectedEpics((prev) =>
      prev.includes(epicId)
        ? prev.filter((id) => id !== epicId)
        : [...prev, epicId]
    );
  };

  return (
    <div className="p-5 bg-[#191919] min-h-[93vh] h-auto">
      <div className="m-5">
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
          epicHeading={epicTitle}
          handleSelectedEpic={handleSelectEpics}
          isKanban={true}
          onCompleteSprint={() => setOpenCompleteSprintModal(true)}
        />
        <div className="p-5">
          <div ref={boardRef} className="flex w-full gap-5">
            {!activeTask || !activeTask.data ? (
              <>
                {taskStatus.map((column: any) => (
                  <KanbanColumn
                    key={column._id}
                    status={column.status}
                    taskLoading={taskLoading}
                    projectColor={project?.color.hex || ""}
                  />
                ))}
              </>
            ) : (
              <>
                {kanbanTasks.map((column: IKanbanColumn) => (
                  <KanbanColumn
                    status={column.status}
                    task={column?.tasks}
                    projectColor={project?.color.hex || ""}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </DndContext>
      <CompleteSprintModal
        isOpen={openCompleteSprintModal}
        onClose={() => setOpenCompleteSprintModal(false)}
        sprintId={activeSprint?._id}
        sprintName={activeSprint?.sprintName}
        startDate={formatDate(activeSprint?.startDate)}
        endDate={formatDate(activeSprint?.endDate)}
        totalIssues={totalIssues || 0}
        doneIssues={doneIssues}
        notDoneIssues={notDoneIssues}
        assigneeSummary={assigneeSummary}
        hasNextSprint={true} 
        sprintData={sprintData?.data}
        onConfirm={() => {
          setOpenCompleteSprintModal(false);
        }}
      />
    </div>
  );
};

export default Kanban;
