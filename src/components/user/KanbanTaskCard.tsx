import React from 'react'
import { ITask, TaskType } from '../../types/task'
import { BsBookmarkCheck } from 'react-icons/bs';
import { RiTaskLine } from 'react-icons/ri';
import { BiBug } from 'react-icons/bi';
import { PiDotsThreeBold } from 'react-icons/pi';
import UserAvatar from '../globa/UserAvatar';
import { getInitials, getRandomColor } from '../../utils/userHelpers';
import { FaUserCircle } from 'react-icons/fa';
import { useDraggable } from '@dnd-kit/core';

const issueTypes = [
  { id: TaskType.STORY, label: "Story", icon: <BsBookmarkCheck className="text-green-400" /> },
  { id: TaskType.TASK, label: "Task", icon: <RiTaskLine className="text-blue-400" /> },
  { id: TaskType.BUG, label: "Bug", icon: <BiBug className="text-red-400" /> },
];

interface KanbanTaskCardPrope{
  task: ITask;
  projectColor: string;
}

const KanbanTaskCard: React.FC<KanbanTaskCardPrope> = ({task, projectColor}) => {

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id, 
    data: { task }, 
  })


   const issueType = issueTypes.find((type) => type.id === task.type)

   const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000, 
      }
    : {};

    console.log("kanbanTaskCard from the card", projectColor)

  return (
    <div 
    ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-[#191919] p-3 rounded-sm text-gray-400 min-h-[110px] max-h-[150px] cursor-grab"
    >  
        <div className='flex justify-between'>
           <div className='flex flex-col justify-between gap-2'>
             <p className='truncate max-w-60'  title={task.title}>{task.title}</p>
             {task.epic && 
             <p className={`font-semibold text-xs px-1.5 py-0.5 rounded-sm w-fit`}
             style={{ backgroundColor: projectColor }}
            >
              {task.epic.title}
              </p>}
             <div className='flex items-center gap-2'>
              <span>{issueType?.icon}</span>
              <span>{task.taskKey}</span>
             </div>
           </div>
           <div className='flex flex-col justify-between'>
            <span className='cursor-pointer'><PiDotsThreeBold size={20} /></span>
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