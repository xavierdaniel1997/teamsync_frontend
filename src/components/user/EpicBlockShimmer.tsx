import React from 'react';
import clsx from 'clsx';

const EpicBlockShimmer: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 bg-[#1a1a1a] text-white px-3 py-2 rounded-md animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-700 rounded-sm" />
        <div className="w-5 h-5 bg-gray-700 rounded-sm" />
        <div className="h-4 bg-gray-700 rounded-sm w-3/4" />
      </div>
      {/* <div className="h-1 w-full rounded-sm bg-gray-700" />
      <div className="flex flex-col gap-2">
        <div className="bg-[#1D2125] h-4 rounded-sm w-1/4" />
        <div className="bg-[#1D2125] h-4 rounded-sm w-1/3" />
      </div> */}
    </div>
  );
};

export default EpicBlockShimmer;
