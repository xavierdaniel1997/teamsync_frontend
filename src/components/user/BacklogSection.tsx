import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import TaskInput from './TaskInput';
import TaskCard from './TaskCard';
import { useProject } from '../../hooks/useProject';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'sonner';
import { ITask } from '../../types/task';
import TaskShimmer, { TaskShimmerList } from './TaskShimmer';

interface BacklogSectionProps {
  epicId?: string;
  backlogTasks: ITask[];
  backlogLoading: boolean;
}

const BacklogSection: React.FC<BacklogSectionProps> = ({ epicId, backlogTasks, backlogLoading }) => {
  const [createIssue, setCreateIssue] = useState(false);
  
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId);
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId);
  const { useCreateSprint } = useProject();
  
  const handleCreateSprint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !workspaceId) {
      toast.error("Project or workspace not selected");
      return;
    }
    useCreateSprint.mutate({ projectId: projectId, workspaceId: workspaceId });
  };

  // Calculate actual counts
  const taskCount = backlogTasks?.length || 0;
  const totalStoryPoints = backlogTasks?.reduce((total, task) => total + (task.storyPoints || 0), 0) || 0;
  
  // Count tasks by status
  const todoCount = backlogTasks?.filter(task => task.status === 'TO_DO').length || 0;
  const inProgressCount = backlogTasks?.filter(task => task.status === 'IN_PROGRESS').length || 0;
  const doneCount = backlogTasks?.filter(task => task.status === 'DONE').length || 0;

  // console.log("backlog task form the backlog section", backlogTasks)
  
  return (
    <div className="rounded-md p-4 bg-[#202020]">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="accent-gray-500" />
          <FaChevronDown className="text-xs" />
          <span className="font-medium">Backlog</span>
          <span className="text-gray-400 text-sm">({taskCount} issues)</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-gray-400 text-sm">{taskCount} issues</span>
          <span className="text-gray-400 text-sm">Estimate: <strong>{totalStoryPoints}</strong></span>
          
          <div className="flex items-center space-x-1">
            <span className="bg-gray-700 text-xs px-1.5 rounded-full">{todoCount}</span>
            <span className="bg-blue-600 text-xs px-1.5 rounded-full">{inProgressCount}</span>
            <span className="bg-green-600 text-xs px-1.5 rounded-full">{doneCount}</span>
          </div>
          
          <button 
            className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
            onClick={handleCreateSprint}
          >
            Create sprint
          </button>
        </div>
      </div>

      <div className="mt-4">

        {backlogLoading ? (
          <TaskShimmerList count={3} />
        ) : (
    
          backlogTasks?.length > 0 ? (
       
            backlogTasks.map((task) => (
              <TaskCard 
                key={task._id}
                task={task}
              />
            ))
          ) : (
     
            <div className="mt-4 border border-dashed border-gray-600 py-5 text-center text-gray-400 rounded-md">
              Your backlog is empty.
            </div>
          )
        )}
      </div>
      
      {/* Task Creation section */}
      <div className="mt-1">
        {!createIssue ? (
          <button 
            className="text-blue-400 text-sm hover:underline"
            onClick={() => setCreateIssue(true)}
          >
            + Create issue
          </button>
        ) : (
          <TaskInput 
            onCancel={() => setCreateIssue(false)} 
            workspaceId={workspaceId || ""} 
            projectId={projectId || ""} 
            epicId={epicId}
          />
        )}
      </div>
    </div>
  );
};

export default BacklogSection;