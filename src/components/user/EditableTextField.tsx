import { TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';

interface EditableTextFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  displayComponent?: React.ReactNode;
  displayClassName?: string;
  showButtons?: boolean;
}

const commonInputStyles = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#222',
    color: '#DDD',
    '& fieldset': { borderColor: '#444' },
    // CHANGED: Added hover effect for TextField
    '&:hover': {
      backgroundColor: '#222',
      '& fieldset': { borderColor: '#666' },
      boxShadow: '0 0 0 1px #666',
    },
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

const EditableTextField: React.FC<EditableTextFieldProps> = ({
  value,
  onChange,
  showButtons,
  displayComponent,
  displayClassName = '',
  ...textFieldProps
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleStartEditing = () => setIsEditing(true);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !textFieldProps.multiline) {
      setIsEditing(false);
    }
  };

  const baseDisplayStyles = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    boxSizing: 'border-box',
  };

  const displayClasses = `${displayClassName} hover:bg-[#0D0F11] hover:text-white transition-colors duration-150`;

  return isEditing ? (
    <>
      <TextField
        {...textFieldProps}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        sx={commonInputStyles}
        autoFocus
      />
      {showButtons && (
        <div className="flex gap-2 items-center">
          <button className="bg-blue-400 px-2 py-0.5 rounded-xs cursor-pointer">Create</button>
          <button className="bg-[#43414197] px-2 py-0.5 rounded-xs cursor-pointer">Cancel</button>
        </div>
      )}
    </>
  ) : displayComponent ? (
    <div onClick={handleStartEditing} className={displayClasses}>
      {displayComponent}
    </div>
  ) : (
    <p
      onClick={handleStartEditing}
      className={displayClasses}
      style={baseDisplayStyles as React.CSSProperties}
    >
      {value || textFieldProps.placeholder || 'Click to edit'}
    </p>
  );
};

export default EditableTextField;