import { MenuItem, Select, TextField } from '@mui/material';

interface StatusTaskInputProps {
//   selectMenuProps: any;
//   commonInputStyles: any;
  statusValue?: string;
  taskValue?: string;
  onStatusChange?: (value: string) => void;
  onTaskChange?: (value: string) => void;
  placeholder?: string;
  statusOptions?: { value: string; label: string }[];
}

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

const StatusInput: React.FC<StatusTaskInputProps> = ({
//   selectMenuProps,
//   commonInputStyles,
  statusValue = 'TO_DO',
  taskValue = '',
  onStatusChange,
  onTaskChange,
  placeholder = 'What needs to be done',
  statusOptions = [
    { value: 'TO_DO', label: 'To Do' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'DONE', label: 'Done' },
  ],
}) => {
  return (
    <div className="flex gap-2 w-full">
      <Select
        size="small"
        value={statusValue}
        onChange={(e) => onStatusChange?.(e.target.value)}
        MenuProps={selectMenuProps}
        sx={{
          width: '180px',
          backgroundColor: '#222',
          color: '#DDD',
          fontSize: '14px',
          '& .MuiSvgIcon-root': { color: '#888' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4C9AFF' },
          '& .MuiSelect-select': {
            padding: '8px 32px 8px 14px', 
          },
        }}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ fontSize: '14px' }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <TextField
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        size="small"
        value={taskValue}
        onChange={(e) => onTaskChange?.(e.target.value)}
        sx={{
          ...commonInputStyles,
          flex: 1,
          '& .MuiOutlinedInput-root': {
            ...commonInputStyles['& .MuiOutlinedInput-root'],
            height: '38px',
            fontSize: '14px',
            padding: '0',
            '& .MuiInputBase-input': {
              padding: '8px 14px',
            },
          },
        }}
      
      />
    </div>
  );
};

export default StatusInput;