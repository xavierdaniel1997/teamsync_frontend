import { Dialog, DialogContent, IconButton } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { AiFillThunderbolt } from 'react-icons/ai';
import TaskForm from './TaskForm';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  epicId: string;
  epicTitle: string;
  taskCount: number;
  members: [];
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, epicTitle, taskCount, epicId, members}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#191919',
          color: 'white',
          pt: 1,
          pb: 1,
          borderRadius: 1,
          overflow: 'hidden',
          maxHeight: '80vh'
        },
      }}
    >
      <DialogContent className="dialog-scrollbar">
        <div className="flex flex-col gap-3.5 text-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="bg-purple-500 p-0.5 rounded-xs">
                  <AiFillThunderbolt size={12} />
                </div>
                <span>{taskCount}</span>
              </div>
            </div>
            <button className="cursor-pointer" onClick={onClose}>
              <IoClose size={20} />
            </button>
          </div>
          <TaskForm epicId={epicId} epicTitle={epicTitle} onClose={onClose} members={members}/>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;