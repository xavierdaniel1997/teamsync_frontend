import React from 'react';
import { DotStream } from "ldrs/react";

interface DotStreamLoadingProps {
  loading: boolean;
  text?: string;
  fallback?: string | React.ReactNode;
  size?: number;
  color?: string;
}

const DotStreamLoading: React.FC<DotStreamLoadingProps> = ({
  loading,
  text = "Sending...",
  fallback = "Enter",
  size = 26,
  color = "white"
}) => {
  return (
    <div className="flex items-center justify-center w-full h-full py-0.5">
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <DotStream size={size} speed={2.5} color={color} />
          <span className="text-sm font-medium">{text}</span>
        </div>
      ) : (
        <span className="text-sm font-medium">{fallback}</span>
      )}
    </div>
  );
};

export default DotStreamLoading;
