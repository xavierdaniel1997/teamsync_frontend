import React from 'react';

const ShimmerKanbanTaskCard: React.FC = () => {
  return (
    <div className="bg-[#191919] p-3 rounded-sm min-h-[110px] max-h-[150px] animate-pulse">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between gap-3 w-full">
          <div className="h-5 w-3/4 bg-gray-700 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-600 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
            <div className="h-4 w-16 bg-gray-600 rounded"></div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="h-5 w-5 bg-gray-600 rounded"></div>
          <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerKanbanTaskCard;