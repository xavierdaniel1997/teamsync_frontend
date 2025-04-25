import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { IoClose, IoDocumentOutline } from 'react-icons/io5';
import { IUser } from '../../types/users';
import UserAvatar from '../globa/UserAvatar';
import { getInitials, getRandomColor } from '../../utils/userHelpers';


interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  projectName?: string;
  // projectMember?: { _id: string; email: string; fullName: string; secondName?: string; avatar?: string; }[] | undefined;
  // projectMember?: {
  //   _id: string;
  //   accessLevel: string;
  //   user: {
  //     _id: string;
  //     email: string;
  //     fullName: string;
  //     secondName?: string;
  //     avatar?: string;
  //   };
  // }[];
    projectMember?: { accessLevel: string; user: IUser; _id: string }[] | undefined;
}

const commonInputStyles = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#222',
    color: '#DDD',
    '& fieldset': { borderColor: '#444' },
    '&:hover fieldset': { borderColor: '#444' },
    '&.Mui-focused fieldset': { borderColor: '#4C9AFF' },
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#888',
    opacity: 1,
  },
  '& .MuiSvgIcon-root': {
    color: '#888',
  },
};


const selectMenuProps = {
  PaperProps: {
    sx: {
      backgroundColor: '#222',
      color: '#DDD',
      '& .MuiMenuItem-root': {
        '&:hover': {
          backgroundColor: '#333',
        },
        '&.Mui-selected': {
          backgroundColor: '#444',
          '&:hover': {
            backgroundColor: '#444',
          },
        },
      },
    },
  },
};


const CreateTaskModal: React.FC<TaskModalProps> = ({ open, onClose, projectName, projectMember }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#1E1E1E',
          color: 'white',
          padding: 1,
          borderRadius: 1,
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid #333',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500 }}>
            Create Task
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: '#888' }} onClick={onClose}>
          <IoClose size={20} />
        </IconButton>
      </Box>

      <DialogContent
        className="dialog-scrollbar"
        sx={{
          padding: '16px',
          bgcolor: '#1E1E1E',
          maxHeight: '70vh',
          overflowY: 'auto',
        }}
      >
        {/* Project */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Project
          </Typography>
          <TextField
            placeholder="Project Name"
            variant="outlined"
            fullWidth
            size="small"
            value={projectName}
            sx={commonInputStyles}
          />
        </Box>

        {/* Title */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Title
          </Typography>
          <TextField
            placeholder="Enter task title"
            variant="outlined"
            fullWidth
            size="small"
            sx={commonInputStyles}
          />
        </Box>

        {/* Description */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Description
          </Typography>
          <TextField
            placeholder="Enter task description"
            variant="outlined"
            fullWidth
            size="small"
            multiline
            rows={4}
            sx={commonInputStyles}
          />
        </Box>

        {/* Type */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Type
          </Typography>
          <Select
            fullWidth
            size="small"
            defaultValue=""
            MenuProps={selectMenuProps}
            // sx={commonInputStyles}
            sx={{
              backgroundColor: '#222',
              color: '#DDD',
              '& .MuiSvgIcon-root': { color: '#888' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4C9AFF' },
            }}
          >
            <MenuItem value="">Select type</MenuItem>
            <MenuItem value="BUG">Bug</MenuItem>
            <MenuItem value="STORY">Story</MenuItem>
            <MenuItem value="TASK">Task</MenuItem>
          </Select>
        </Box>

        {/* Status */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Status
          </Typography>
          <Select
            fullWidth
            size="small"
            defaultValue="TO_DO"
            MenuProps={selectMenuProps}
            sx={{
              backgroundColor: '#222',
              color: '#DDD',
              '& .MuiSvgIcon-root': { color: '#888' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4C9AFF' },
            }}
          >
            <MenuItem value="TO_DO">To Do</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="DONE">Done</MenuItem>
          </Select>
        </Box>

        {/* Assignee */}
        {/* <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Assignee
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            <Chip
              label="user@example.com"
              onDelete={() => {}}
              sx={{
                bgcolor: '#333',
                color: '#DDD',
                '& .MuiSvgIcon-root': { color: '#888' },
              }}
            />
          </Box>
          <TextField
            placeholder="Enter assignee's email"
            variant="outlined"
            fullWidth
            size="small"
            sx={commonInputStyles}
          />
        </Box> */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Assignee
          </Typography>
          <Select
            fullWidth
            size="small"
            defaultValue="TO_DO"
            MenuProps={selectMenuProps}
            sx={{
              backgroundColor: '#222',
              color: '#DDD',
              '& .MuiSvgIcon-root': { color: '#888' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4C9AFF' },
            }}
          >
            {projectMember?.map((member) => (
              <MenuItem key={member._id} value={member._id}>
                <div className='flex items-center gap-2'>
                  <UserAvatar user={member.user} getRandomColor={getRandomColor} getInitials={getInitials} width={6} height={6}/>
                  <span>{member?.user?.email}</span>
                </div>
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Reporter */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Reporter
          </Typography>
          <TextField
            placeholder="Enter reporter's email"
            variant="outlined"
            fullWidth
            size="small"
            sx={commonInputStyles}
          />
        </Box>

        {/* Epic */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Epic
          </Typography>
          <Select
            fullWidth
            size="small"
            defaultValue=""
            MenuProps={selectMenuProps}
            sx={{
              backgroundColor: '#222',
              color: '#DDD',
              '& .MuiSvgIcon-root': { color: '#888' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4C9AFF' },
            }}
          >
            <MenuItem value="">Select epic</MenuItem>
            <MenuItem value="epic1">Epic 1</MenuItem>
            <MenuItem value="epic2">Epic 2</MenuItem>
          </Select>
        </Box>

        {/* Parent */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Parent Task
          </Typography>
          <Select
            fullWidth
            size="small"
            defaultValue=""
            MenuProps={selectMenuProps}
            sx={{
              backgroundColor: '#222',
              color: '#DDD',
              '& .MuiSvgIcon-root': { color: '#888' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4C9AFF' },
            }}
          >
            <MenuItem value="">Select parent task</MenuItem>
            <MenuItem value="task1">Task 1</MenuItem>
            <MenuItem value="task2">Task 2</MenuItem>
          </Select>
        </Box>


        {/* Sprint */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Sprint
          </Typography>
          <Select
            fullWidth
            size="small"
            defaultValue=""
            MenuProps={selectMenuProps}
            sx={{
              backgroundColor: '#222',
              color: '#DDD',
              '& .MuiSvgIcon-root': { color: '#888' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4C9AFF' },
            }}
          >
            <MenuItem value="">Select sprint</MenuItem>
            <MenuItem value="sprint1">Sprint 1</MenuItem>
            <MenuItem value="sprint2">Sprint 2</MenuItem>
          </Select>
        </Box>

        {/* File Upload */}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
            Attachments
          </Typography>
          <Box
            sx={{
              border: '2px dashed #444',
              borderRadius: '4px',
              backgroundColor: '#222',
              padding: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { borderColor: '#666' },
              '&.drag-over': { borderColor: '#4C9AFF', backgroundColor: '#2A2A2A' },
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Typography sx={{ color: '#888', fontSize: '14px' }}>
              Drag and drop files here or click to upload
            </Typography>
            <input
              id="file-input"
              type="file"
              multiple
              style={{ display: 'none' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            <Chip
              label="image.png"
              onDelete={() => { }}
              avatar={
                <img
                  src="https://via.placeholder.com/24"
                  alt="preview"
                  style={{ width: 24, height: 24, borderRadius: '4px' }}
                />
              }
              sx={{
                bgcolor: '#333',
                color: '#DDD',
                '& .MuiSvgIcon-root': { color: '#888' },
              }}
            />
            <Chip
              label="document.pdf"
              onDelete={() => { }}
              avatar={<IoDocumentOutline color="#888" />}
              sx={{
                bgcolor: '#333',
                color: '#DDD',
                '& .MuiSvgIcon-root': { color: '#888' },
              }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          padding: '16px',
          justifyContent: 'flex-end',
          bgcolor: '#1E1E1E',
          borderTop: '1px solid #333',
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: '#555',
            color: 'white',
            '&:hover': { backgroundColor: '#444' },
            textTransform: 'none',
            borderRadius: '3px',
            padding: '4px 12px',
            fontSize: '14px',
          }}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: '#0052CC',
            color: 'white',
            '&:hover': { backgroundColor: '#0047B3' },
            textTransform: 'none',
            borderRadius: '3px',
            padding: '4px 12px',
            fontSize: '14px',
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTaskModal;




