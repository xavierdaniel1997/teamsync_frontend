import React from "react";

const TaskShimmer: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-6 py-2 border-b border-[#2E2E2E] hover:bg-[#2a2a2a] transition-colors duration-150">
      <div className="flex items-center gap-5">
        {/* Checkbox shimmer */}
        <div className="w-4 h-4 bg-gray-700 rounded relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30 animate-shimmer" />
        </div>
        
        {/* Title shimmer - increased width */}
        <div className="w-48 h-4 bg-gray-700 rounded relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30 animate-shimmer" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-3">
          {/* User icon shimmer */}
          <div className="w-6 h-6 bg-gray-700 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30 animate-shimmer" />
          </div>
          
          {/* Dots icon shimmer */}
          <div className="w-5 h-5 bg-gray-700 rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30 animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskShimmer;

// Also export a list component for convenience
export const TaskShimmerList: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <TaskShimmer key={index} />
        ))}
    </>
  );
};