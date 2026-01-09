import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { PiDotsThreeBold } from "react-icons/pi";
import { ITask, TaskType } from "../../types/task";
import { BsBookmarkCheck } from "react-icons/bs";
import { RiPencilFill, RiTaskLine, RiDraggable } from "react-icons/ri";
import { BiBug } from "react-icons/bi";
import { statusTypes } from "../../utils/taskConfing";
import AssignMembers from "./AssignMembers";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IoAddSharp } from "react-icons/io5";
import EditTaskModal from "./EditTaskModal";
import { useProject } from "../../hooks/useProject";
import EpicListModal from "./EpicListModal";
import UserAvatar from "../globa/UserAvatar";
import { getInitials, getRandomColor } from "../../utils/userHelpers";
import { useDraggable } from '@dnd-kit/core';
import TaskModal from "./TaskModal";


const issueTypes = [
  { id: TaskType.STORY, label: "Story", icon: <BsBookmarkCheck className="text-green-400" /> },
  { id: TaskType.TASK, label: "Task", icon: <RiTaskLine className="text-blue-400" /> },
  { id: TaskType.BUG, label: "Bug", icon: <BiBug className="text-red-400" /> },
];

interface TaskCardProps {
  task: ITask;
  taskType: string;
  containerId: string;
  sprintStatus?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, taskType, containerId, sprintStatus }) => {
  const project = useSelector((state: RootState) => state.project.selectedProject)
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId)
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId)
  // const [status, setStatus] = useState<TaskStatus>(task.status)
  const [openAssigneMember, setOpenAssigneMember] = useState<boolean>(false)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>(task.title);
  const assigneeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const issueType = issueTypes.find((type) => type.id === task.type)
  const currentStatus = statusTypes.find((statusType) => statusType.id === task.status)
  const [openEditTaskModal, setOpenEditTaskModal] = useState<boolean>(false)
  const [showEpicList, setShowEpicList] = useState<boolean>(false)
  const { useGetEpic, useUpdateTask } = useProject()
  const { data: epicData } = useGetEpic(projectId || "")




  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task._id,
    data: {
      taskType,
      containerId,
      sprintId: task.sprint || '',
    },

    disabled: editTitle || openAssigneMember || showEpicList || openEditTaskModal || sprintStatus === "ACTIVE",
  });


  // const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>, taskId: string) => {
  //   event.stopPropagation();
  //   const newStatus = event.target.value as TaskStatus;
  //   setStatus(newStatus);
  //   if (workspaceId && projectId) {
  //     const formData = new FormData();
  //     formData.append("status", newStatus);
  //     useUpdateTask.mutate({
  //       workspaceId: workspaceId,
  //       projectId: projectId,
  //       taskId: taskId,
  //       // task: { status: formData}
  //       task: formData,
  //     })
  //   }
  // };


  const handleAssigneeChange = (userId: string | null) => {
    if (workspaceId && projectId) {
      const formData = new FormData();
      if (userId) formData.append("assignee", userId);
      else formData.append("assignee", "");
      useUpdateTask.mutate({
        workspaceId: workspaceId,
        projectId: projectId,
        taskId: task._id,
        // task: { assignee: userId }
        task: formData,
      }, {
        onSuccess: () => setOpenAssigneMember(false)
      })
    }
  };


  const handleAddEpic = (epicId: string | null) => {
    if (workspaceId && projectId) {
      const formData = new FormData();
      if (epicId) formData.append("epicId", epicId);
      else formData.append("epicId", "");
      useUpdateTask.mutate({
        workspaceId: workspaceId,
        projectId: projectId,
        taskId: task._id,
        // task: { epicId }
        task: formData,
      },
        {
          onSuccess: () => setShowEpicList(false)
        }
      )
    }

  }

  const handleBlurTitle = (event: React.FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (workspaceId && projectId) {
      const formData = new FormData();
      formData.append("title", newTitle.trim());
      useUpdateTask.mutate({
        workspaceId: workspaceId,
        projectId: projectId,
        taskId: task._id,
        // task: { title: newTitle }
        task: formData,
      }, {
        onSuccess: () => setEditTitle(false),
      })
    }else{
      setEditTitle(false);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newTitle.trim()) {
      event.preventDefault();
      handleBlurTitle(event as any);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setNewTitle(task.title);
      setEditTitle(false);
    }
  };

  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (assigneeRef.current && !assigneeRef.current.contains(event.target as Node)) {
        setOpenAssigneMember(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setEditTitle(true)
  }


  const handleEpicButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEpicList(!showEpicList);
    console.log("click handle epic modal open close")
  };

  const handleAssigneeButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenAssigneMember(!openAssigneMember);
    console.log("click handle open assignee user")
  };

  const handleEditTaskButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenEditTaskModal(!openEditTaskModal);
    console.log("click handle etit task button click")
  };



  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`task-card cursor-grab group flex items-center justify-between px-6 py-2 bg-[#1a1a1a] border-b border-[#2E2E2E] hover:bg-[#2a2a2a] transition-colors duration-150 text-gray-400 ${isDragging ? 'dragging' : ''}`}
    >

      <div className="flex items-center gap-6">
        <input
          type="checkbox"
          className="accent-gray-600 rounded border-gray-600"
        />
        <div className="cursor-grab">
          <RiDraggable size={20} />
        </div>
        {issueType?.icon}
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">{task.taskKey}</span>
        </div>

        <div className="flex items-center">
          {editTitle ? (
            <input
              ref={inputRef}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleBlurTitle}
              onClick={handleInputClick}
              onKeyDown={handleKeyDown}
              className="w-64 text-sm font-medium text-white border-none focus:outline-none focus:ring-1 focus:ring-gray-500 rounded-xs p-1"
              autoFocus
            />
          ) : (
            <>
              <span
                className="text-sm font-medium text-white truncate max-w-[350px]"
                title={task.title}
              >
                {task.title}
              </span>
              <span
                className="ml-4 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white cursor-pointer transition-opacity duration-150"
                onClick={handleEditClick}
                aria-label={`Edit task ${task.taskKey}`}
              >
                <RiPencilFill size={16} />
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-8 ">
        <div className="relative">
          {task?.epic ?
            <button className={`font-semibold text-gray-200 text-xs  px-1.5 py-0.5 rounded-sm cursor-pointer relative`}
              // onClick={() => setShowEpicList(!showEpicList)}
              style={{backgroundColor: project?.color.hex}}
              onClick={handleEpicButtonClick}
            >{task.epic.title}</button>
            :
            <button
              className="flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white cursor-pointer transition-opacity duration-150 "
              // onClick={() => setShowEpicList(!showEpicList)}
              onClick={handleEpicButtonClick}
            >
              <IoAddSharp />
              Epic
            </button>}

          {showEpicList &&
            (<div className="absolute right-0 top-6 w-auto z-50">
              <EpicListModal epicDetails={epicData.data} onSelectEpic={handleAddEpic} hasEpic={!!task.epic} projectColor={project?.color.hex || ""}/>
            </div>)}
        </div>


        <div>
          {/* <select
            value={status}
            onChange={(event) => handleStatusChange(event, task._id)}
            className={`appearance-none p-0.5 px-1 text-center rounded-sm text-xs font-medium ${currentStatus?.bgColor} ${currentStatus?.textColor}`}
          >
            {statusTypes.map((status) => (
              <option key={status.id} value={status.id} className={`${status.bgColor} ${status.textColor}`}>
                {status.label}
              </option>
            ))}
          </select> */}
          <button  className={`appearance-none w-20 px-2 py-0.5 text-center rounded-sm text-xs font-medium ${currentStatus?.bgColor} ${currentStatus?.textColor}`}
          >{task.status}</button>
        </div>
        <div className="rounded-full flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div ref={assigneeRef} className="relative flex items-center cursor-pointer">
              <button className="cursor-pointer"
                // onClick={() => setOpenAssigneMember(!openAssigneMember)}
                onClick={handleAssigneeButtonClick}
              >
                {task.assignee && typeof task.assignee === "object" ? (
                  <UserAvatar user={task.assignee} width={6} height={6} getRandomColor={getRandomColor} getInitials={getInitials} />
                ) : (
                  <FaUserCircle size={24} />
                )}

              </button>
              {openAssigneMember && (
                <div className="absolute right-0 top-6 w-auto z-50">
                  <AssignMembers members={project?.members || []} onSelectMember={handleAssigneeChange} />
                </div>
              )}
            </div>
            <div className="relative">
              <button className="p-0.5 hover:bg-gray-600 rounded cursor-pointer"
                // onClick={() => setOpenEditTaskModal(!openEditTaskModal)}
                onClick={handleEditTaskButtonClick}
              >
                <PiDotsThreeBold size={20} />
              </button>
              {openEditTaskModal && <div className="absolute left-5 z-50">
                <EditTaskModal
                  taskType={taskType}
                  taskId={task._id}
                  taskName={task.taskKey}
                  sprintId={typeof task?.sprint === 'string' || task?.sprint == null ? task?.sprint : task?.sprint._id}
                  workspaceId={workspaceId || ''}
                  projectId={projectId || ''}
                  closeOpenEditTaskModal={() => setOpenEditTaskModal(!openEditTaskModal)}
                  openTaskModal={() => setIsTaskModalOpen(true)}
                  
                />
              </div>}
            </div>
          </div>
        </div>
      </div>
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        parentTask={task.epic?.title}
        epicTitle={task.title}
        isTask={true}
        assignedMember={typeof task.assignee === 'object' && task.assignee !== null ? task.assignee : undefined}
        members={project?.members as [] || []}
        reporter={task.reporter}
        taskId={task._id}
        task={task}
      />
    </div>
  );
};

export default TaskCard;