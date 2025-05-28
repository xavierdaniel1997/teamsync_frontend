import React from 'react'
import { ITask, TaskType } from '../../types/task'
import { BsBookmarkCheck } from 'react-icons/bs';
import { RiTaskLine } from 'react-icons/ri';
import { BiBug } from 'react-icons/bi';
import { PiDotsThreeBold } from 'react-icons/pi';
import UserAvatar from '../globa/UserAvatar';
import { getInitials, getRandomColor } from '../../utils/userHelpers';
import { FaUserCircle } from 'react-icons/fa';

const issueTypes = [
  { id: TaskType.STORY, label: "Story", icon: <BsBookmarkCheck className="text-green-400" /> },
  { id: TaskType.TASK, label: "Task", icon: <RiTaskLine className="text-blue-400" /> },
  { id: TaskType.BUG, label: "Bug", icon: <BiBug className="text-red-400" /> },
];

interface KanbanTaskCardPrope{
  task: ITask;
}

const KanbanTaskCard: React.FC<KanbanTaskCardPrope> = ({task}) => {
  console.log("task details from the kanbanTask card", task)
   const issueType = issueTypes.find((type) => type.id === task.type)
  return (
    <div className='bg-[#191919] p-3 rounded-sm text-gray-400 min-h-[110px] max-h-[150px]'>  
        <div className='flex justify-between'>
           <div className='flex flex-col justify-between gap-3'>
             <p className='truncate max-w-[100px]'  title={task.title}>{task.title}</p>
             {task.epic && <p className='font-semibold text-xs bg-violet-600/20 px-1.5 py-0.5 rounded-sm w-fit'>{task.epic.title}</p>}
             <div className='flex items-center gap-2'>
              <span>{issueType?.icon}</span>
              <span>{task.taskKey}</span>
             </div>
           </div>
           <div className='flex flex-col justify-between'>
            <span><PiDotsThreeBold size={20} /></span>
             {task.assignee && typeof task.assignee === "object" ? (
                  <UserAvatar user={task.assignee} width={6} height={6} getRandomColor={getRandomColor} getInitials={getInitials} />
                ) : (
                  <FaUserCircle size={24} />
                )}
           </div>
        </div>
    </div>
  )
}

export default KanbanTaskCard