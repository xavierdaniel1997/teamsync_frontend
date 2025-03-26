import React from 'react';
import Button from '@mui/material/Button';


interface CustomButtonProps {
  children: React.ReactNode; 
  type?: 'button' | 'submit' | 'reset'; // HTML button type
  disabled?: boolean; // Disabled state
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Optional onClick handler
  backgroundColor?: string; // Custom background color
  textColor?: string; // Custom text color
  hoverBackgroundColor?: string; // Custom hover background color
  borderRadius?: string; // Custom border radius
  padding?: string; // Custom padding
  fontSize?: string; // Custom font size
  sx?: object; // Allow custom sx prop to override or extend styles
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  onClick,
  backgroundColor = '#0052CC', 
  textColor = 'white', 
  hoverBackgroundColor = '#0047B3', 
  borderRadius = '3px', 
  padding = '4px 12px', 
  fontSize = '14px', 
  sx,
}) => {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        '&:hover': { backgroundColor: hoverBackgroundColor },
        textTransform: 'none',
        borderRadius: borderRadius,
        padding: padding,
        fontSize: fontSize,
        ...sx, 
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;