import { useDroppable } from "@dnd-kit/core";
import { ITask } from "../../../types/task";
import KanbanTaskCard from "../../../components/user/KanbanTaskCard";
import ShimmerKanbanTaskCard from "../../../components/user/ShimmerKanbanTaskCard";

interface KanbanColumnProps {
  status: string;
  label?: string;
  bgColor?: string;
  task?: ITask[];
  taskLoading?: boolean;
  projectColor: string;
}


const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, bgColor, task, taskLoading, projectColor }) => { 
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { type: 'status', id: status },
  });

  console.log("make the type task", task)
  
  return (
    <div className="flex-1 bg-[#202020] rounded-md p-3 min-w-[250px] max-w-[380px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`text-gray-400 font-medium`}>{status}</span>
          <span className={`${bgColor} text-xs px-1.5 rounded-full text-white`}>{task?.length}</span>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={`${isOver ? 'bg-[#2a2a2a]' : ''} rounded-md transition-colors duration-150`}
      >
        <div className="flex flex-col gap-1.5">

        {taskLoading ? (
          Array(3).fill(0).map((_, index) => (
            <ShimmerKanbanTaskCard key={index}/>
          ))
        ) : (
          task?.map((currentTask: ITask) => (
            <KanbanTaskCard key={currentTask._id} task={currentTask} projectColor={projectColor}/>
          ))
        )}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;