import React from 'react'
import { BiSolidRightArrow } from 'react-icons/bi'

const AddProjectRightItem: React.FC = () => {
  return (
    <div>
              <div className="mb-4 bg-[#202124] rounded p-4 border border-[#303136]">
                <div className="flex mb-2">
                  <div className="bg-blue-500 rounded w-10 h-10 flex items-center justify-center">
                    <BiSolidRightArrow className="text-white transform rotate-90" />
                  </div>
                  <p className="ml-3 text-gray-300">Scrum</p>
                </div>
                <p className="text-gray-400 text-sm">
                  Sprint toward your project goals with a board, backlog, and timeline.
                </p>
              </div>
    
              <div className="mb-6 bg-[#202124] rounded p-4 border border-[#303136]">
                <div className="flex mb-2">
                  <div className="bg-[#202124] border border-[#404348] rounded w-10 h-10 flex items-center justify-center">
                    <div className="w-6 h-6 grid grid-cols-2 grid-rows-2 gap-0.5">
                      <div className="bg-orange-500 rounded-sm"></div>
                      <div className="bg-blue-500 rounded-sm"></div>
                      <div className="bg-blue-500 rounded-sm"></div>
                      <div className="bg-orange-500 rounded-sm"></div>
                    </div>
                  </div>
                  <p className="ml-3 text-gray-300">Team-managed</p>
                </div>
                <p className="text-gray-400 text-sm">
                  Control your own working processes and practices in a self-contained space.
                </p>
              </div>
            </div>
  )
}

export default AddProjectRightItem