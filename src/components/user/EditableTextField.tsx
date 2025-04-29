import { TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';

interface EditableTextFieldProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  displayComponent?: React.ReactNode;
  displayClassName?: string;
  showButtons?: boolean;
  onConfirm?: (value: string) => void;
  onCancel?: () => void; 
}

const commonInputStyles = {
  '& .MuiOutlinedInput-root': {
    width: '100%',
    backgroundColor: '#222',
    color: '#DDD',
    '& fieldset': { borderColor: '#444' },
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
  onConfirm,
  onCancel,
  ...textFieldProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value); 

  const handleStartEditing = () => {
    setTempValue(value);
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (!showButtons) {
      setIsEditing(false);
      onConfirm?.(tempValue); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !textFieldProps.multiline) {
      setIsEditing(false);
      onConfirm?.(tempValue); 
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value); 
    onChange(e); 
  };

  const handleConfirm = () => {
    setIsEditing(false);
    onConfirm?.(tempValue); 
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempValue(value); 
    onCancel?.(); 
  };

  const baseDisplayStyles = {
    whiteSpace: textFieldProps.multiline ? 'pre-wrap' : 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    boxSizing: 'border-box',
  };

  const displayClasses = `${displayClassName} hover:bg-[#0D0F11] hover:text-white transition-colors duration-150`;

  return isEditing ? (
    <div className="flex flex-col gap-2 w-full">
      <TextField
        {...textFieldProps}
        value={tempValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        sx={commonInputStyles}
        autoFocus
      />
      {showButtons && (
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={handleConfirm}
            className="bg-blue-400 px-2 py-0.5 rounded-xs cursor-pointer text-white"
          >
            Create
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-[#43414197] px-2 py-0.5 rounded-xs cursor-pointer text-white"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
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