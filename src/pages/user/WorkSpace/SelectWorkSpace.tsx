import React from 'react';
import UserAvatar from '../../../components/globa/UserAvatar';
import { getInitials, getRandomColor } from '../../../utils/userHelpers';

interface SelectWorkSpaceProps {
  selectedWorkspaceId: string;
  selectedWorkspace: any;
  ownedWorkspace: any;
  invitedWorkspaces: any[];
  handleWorkspaceChange: (id: string) => void;
}

const SelectWorkSpace: React.FC<SelectWorkSpaceProps> = ({
  selectedWorkspaceId,
  selectedWorkspace,
  ownedWorkspace,
  invitedWorkspaces,
  handleWorkspaceChange
}) => {
  return (
    <div className='w-full flex justify-between gap-5'>
      {/* Workspace Select Dropdown */}
      <div className='w-full'>
        <span className="mb-1 text-sm">Select Workspace</span>
        <select
          className="w-full border border-[#3a3a3a] p-1.5 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
          value={selectedWorkspaceId}
          onChange={(e) => handleWorkspaceChange(e.target.value)}
        >
          {ownedWorkspace && (
            <optgroup label="Owned Workspace">
              <option value={ownedWorkspace._id}>
                {ownedWorkspace.name} (Owned)
              </option>
            </optgroup>
          )}
          {invitedWorkspaces?.length > 0 && (
            <optgroup label="Invited Workspaces">
              {invitedWorkspaces.map((workspace: any) => (
                <option key={workspace._id} value={workspace._id}>
                  {workspace.name}
                </option>
              ))}
            </optgroup>
          )}
        </select>
      </div>

      {/* Owner Field */}
      <div className='w-full'>
        <span className="mb-1 text-sm">Owner</span>
        <div className="w-full border border-[#3a3a3a] p-1.5 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center gap-2">
          <UserAvatar user={selectedWorkspace?.owner || undefined} height={6} width={6} getRandomColor={getRandomColor} getInitials={getInitials}/>
            <p>{selectedWorkspace?.owner?.fullName || ''}</p>
        </div>
      </div>

      {/* Created At Field */}
      <div className='w-full'>
        <span className="mb-1 text-sm">Created At</span>
        <input
          type="text"
          readOnly
          className="w-full border border-[#3a3a3a] p-1.5 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={
            selectedWorkspace?.createdAt
              ? new Date(selectedWorkspace.createdAt).toLocaleDateString("default", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })
              : ''
          }
        />
      </div>
    </div>
  );
};

export default SelectWorkSpace;
