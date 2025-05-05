import React from 'react'
import { formatDate } from '../../../utils/formatDate';

interface WorkspaceSettingFromProps{
    workspaceName ?: string;
    workspaceCreatedAt?: string;
}

const WorkspaceSettingForm: React.FC<WorkspaceSettingFromProps> = ({workspaceName, workspaceCreatedAt}) => {
  return (
    <div className="space-y-6">
    <div className="bg-[#2E3033] rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-6">Workspace Settings</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-300 mb-2">Workspace Name</label>
          <input 
            type="text" 
            className="w-full bg-[#252729] border border-[#404348] rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={workspaceName || ""}
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Workspace Owner</label>
          <input 
            type="text" 
            className="w-full bg-[#252729] border border-[#404348] rounded-lg p-3 text-gray-400 focus:outline-none"
            defaultValue="You"
            disabled
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Created On</label>
          <input 
            type="text" 
            className="w-full bg-[#252729] border border-[#404348] rounded-lg p-3 text-gray-400 focus:outline-none"
            defaultValue={workspaceCreatedAt ? formatDate(workspaceCreatedAt) : ""}
            disabled
          />
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg py-2 px-6">
          Save Changes
        </button>
        <button className="bg-[#252729] hover:bg-[#333] transition-colors text-white rounded-lg py-2 px-6">
          Cancel
        </button>
      </div>
    </div>
    
    <div className="bg-[#2E3033] rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-red-400">Danger Zone</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-red-900/50 bg-red-900/20 rounded-lg">
          <div>
            <h4 className="font-medium">Transfer Ownership</h4>
            <p className="text-gray-400 text-sm">Transfer this workspace to another user</p>
          </div>
          <button className="bg-[#252729] hover:bg-[#333] transition-colors text-white rounded-lg py-2 px-4">
            Transfer
          </button>
        </div>
        
        <div className="flex items-center justify-between p-4 border border-red-900/50 bg-red-900/20 rounded-lg">
          <div>
            <h4 className="font-medium">Delete Workspace</h4>
            <p className="text-gray-400 text-sm">Permanently delete this workspace and all its projects</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 transition-colors text-white rounded-lg py-2 px-4">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default WorkspaceSettingForm