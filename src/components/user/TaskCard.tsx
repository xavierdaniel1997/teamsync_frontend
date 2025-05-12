import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { PiDotsThreeBold } from "react-icons/pi";
import { ITask, TaskType, TaskStatus } from "../../types/task";
import { BsBookmarkCheck } from "react-icons/bs";
import { RiPencilFill, RiTaskLine } from "react-icons/ri";
import { BiBug } from "react-icons/bi";
import { statusTypes } from "../../utils/taskConfing";
import AssignMembers from "./AssignMembers";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IoAddSharp } from "react-icons/io5";


const issueTypes = [
  { id: TaskType.STORY, label: "Story", icon: <BsBookmarkCheck className="text-green-400" /> },
  { id: TaskType.TASK, label: "Task", icon: <RiTaskLine className="text-blue-400" /> },
  { id: TaskType.BUG, label: "Bug", icon: <BiBug className="text-red-400" /> },
];

interface TaskCardProps {
  task: ITask;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const project = useSelector((state: RootState) => state.project.selectedProject)
  const [status, setStatus] = useState<TaskStatus>(task.status)
  const [openAssigneMember, setOpenAssigneMember] = useState<boolean>(false)
  const [editTitle, setEditTitle] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>(task.title);
  const assigneeRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const issueType = issueTypes.find((type) => type.id === task.type)
  const currentStatus = statusTypes.find((statusType) => statusType.id === task.status)

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as TaskStatus;
    if (newStatus === status) return;
    setStatus(newStatus);
  };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // handleSaveTitle();
    } else if (event.key === "Escape") {
      setNewTitle(task.title);
      setEditTitle(false);
    }
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

  const handleEditClick = () => {
    setEditTitle(true)
  }


  return (
    <div className="group flex items-center justify-between px-6 py-1 bg-[#1a1a1a] border-b border-[#2E2E2E] hover:bg-[#2a2a2a] transition-colors duration-150 text-gray-400">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="w-3 h-3 bg-gray-400 accent-gray-600 rounded border-gray-600"
        />
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
              // onBlur={handleSaveTitle}
              onKeyDown={handleKeyDown}
              className="w-64 text-sm font-medium text-white border-none focus:outline-none focus:ring-1 focus:ring-gray-500 rounded-xs p-1"
              autoFocus
            />
          ) : (
            <>
              <span className="text-sm font-medium text-white">{task.title}</span>
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

      <div className="flex items-center gap-8">
        {task?.epic ? <div>
          <p className="font-semibold text-xs bg-violet-600/20 px-1.5 py-0.5 rounded-sm">{task.epic.title}</p>
        </div> : <button className="flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white cursor-pointer transition-opacity duration-150">
          <IoAddSharp/>
              Epic
            </button>}
        <div>
          <select
            value={status}
            onChange={handleStatusChange}
            className={`appearance-none p-0.5 px-1 text-center rounded-sm text-xs font-medium ${currentStatus?.bgColor} ${currentStatus?.textColor}`}
          >
            {statusTypes.map((status) => (
              <option key={status.id} value={status.id} className={`${status.bgColor} ${status.textColor}`}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div className="rounded-full flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div ref={assigneeRef} className="relative flex items-center">
              <button onClick={() => setOpenAssigneMember(!openAssigneMember)}>
                <FaUserCircle size={24} />
              </button>
              {openAssigneMember && (
                <div className="absolute right-0 top-6 w-auto z-10">
                  <AssignMembers members={project?.members || []}/>
                </div>
              )}
            </div>
            <button className="p-1 hover:bg-gray-600 rounded">
              <PiDotsThreeBold size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;