import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { PiDotsThreeBold } from "react-icons/pi";
import { ITask } from "../../types/task";

interface TaskCardProps {
  task: ITask;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="flex items-center justify-between px-6 py-1 bg-[#1a1a1a] border-b border-[#2E2E2E] hover:bg-[#2a2a2a] transition-colors duration-150 text-gray-400">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="w-4 h-4 accent-blue-500 bg-gray-700 rounded border-gray-600"
        />
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">{task.taskKey}</span>
          {/* <span className="text-sm font-medium text-white">
            {task.title}
          </span> */}
        </div>


        <div className="flex flex-col">
          {/* <span className="text-xs text-gray-400">{task.taskKey}</span> */}
          <span className="text-sm font-medium text-white">
            {task.title}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-12">
        <div className="rounded-full flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <button>
              <FaUserCircle size={24} />
            </button>
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