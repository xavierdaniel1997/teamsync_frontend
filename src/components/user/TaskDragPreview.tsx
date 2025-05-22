import React from 'react';
import { ITask, TaskType } from '../../types/task';
import { BsBookmarkCheck } from 'react-icons/bs';
import { RiTaskLine } from 'react-icons/ri';
import { BiBug } from 'react-icons/bi';

const issueTypes = [
  { id: TaskType.STORY, label: 'Story', icon: <BsBookmarkCheck className="text-green-400" /> },
  { id: TaskType.TASK, label: 'Task', icon: <RiTaskLine className="text-blue-400" /> },
  { id: TaskType.BUG, label: 'Bug', icon: <BiBug className="text-red-400" /> },
];

interface TaskDragPreviewProps {
  task: ITask;
}

const TaskDragPreview: React.FC<TaskDragPreviewProps> = ({ task }) => {
  const issueType = issueTypes.find((type) => type.id === task.type);

  return (
    <div
      className="task-card-preview bg-[#2a2a2a] border border-[#3E3E3E] px-4 py-2 rounded-sm shadow-lg opacity-90 w-64"
      style={{ pointerEvents: 'none' }}
    >
      <div className="flex items-center gap-3">
        <span>{issueType?.icon}</span>
        <span className="text-xs text-gray-400">{task.taskKey}</span>
        <span className="text-sm font-medium text-white truncate">{task.title}</span>
      </div>
    </div>
  );
};

export default TaskDragPreview;