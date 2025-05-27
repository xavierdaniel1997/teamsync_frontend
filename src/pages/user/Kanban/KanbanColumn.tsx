import { useDroppable } from "@dnd-kit/core";
import { ISprint } from "../../../types/sprint";
import { ITask } from "../../../types/task";
import TaskCard from "../../../components/user/TaskCard";
import KanbanTaskCard from "../../../components/user/KanbanTaskCard";

interface KanbanColumnProps {
  status: string;
  label: string;
  bgColor: string;
}


const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, label, bgColor }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { type: 'status', id: status },
  });

  return (
    <div className="flex-1 bg-[#202020] rounded-md p-3 min-w-[250px] max-w-[380px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`text-white font-medium`}>{label}</span>
          <span className={`${bgColor} text-xs px-1.5 rounded-full text-white`}>{"tasks.length"}</span>
        </div>
      </div>
      <div
        ref={setNodeRef}
        className={`min-h-[500px] ${isOver ? 'bg-[#2a2a2a]' : ''} rounded-md transition-colors duration-150`}
      >
        <KanbanTaskCard/>
      </div>
    </div>
  );
};

export default KanbanColumn;