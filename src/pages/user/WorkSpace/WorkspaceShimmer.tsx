import React from 'react';

const WorkspaceShimmer: React.FC = () => {
  return (
        <div className="min-h-screen text-gray-400 p-6">
      <div className="mb-8">
        <div className="flex items-center w-32">
          <div className="w-5 h-5 bg-gray-700 rounded animate-pulse mr-2"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-full"></div>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <div className="w-full max-w-screen-lg p-6 bg-[#1F1F1F] rounded-lg shadow-lg">
          <div className="space-y-6">
            {/* Workspace Profile Section */}
            <div className="pb-7 border-b border-[#333]">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-gray-700 rounded-sm animate-pulse"></div>
                <div className="space-y-1">
                  <div className="h-6 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3"></div>
                  <div className="h-3 bg-gray-700 rounded animate-pulse w-1/4"></div>
                </div>
              </div>
            </div>

            {/* Selected Workspace Section */}
            <div className="pt-1 pb-7 border-b border-[#333]">
              <div className="h-6 bg-gray-700 rounded animate-pulse mb-4 w-1/3"></div>
              <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Workspace Details Section */}
            <div className="pt-1 pb-7 border-b border-[#333]">
              <div className="h-6 bg-gray-700 rounded animate-pulse mb-4 w-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Delete Workspace Section */}
            <div className="pt-1 pb-7">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-700 rounded animate-pulse w-1/3"></div>
                <div className="w-6 h-6 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="space-y-3 mt-4">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse w-full"></div>
                <div className="h-10 bg-gray-700 rounded animate-pulse w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceShimmer;