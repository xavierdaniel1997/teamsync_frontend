import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

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

interface CommonTextFieldProps {
  textTitle: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonTextField: React.FC<CommonTextFieldProps> = ({
  textTitle,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ mb: 1, fontSize: '14px', color: '#DDD' }}>
        {textTitle}
      </Typography>
      <TextField
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        size="small"
        // CHANGED: Removed multiline to fix typing issue
        sx={commonInputStyles}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          // CHANGED: Added debug log to verify onChange
          console.log(`${textTitle} change:`, e.target.value);
          onChange?.(e);
        }}
      />
    </Box>
  );
};

export default CommonTextField;