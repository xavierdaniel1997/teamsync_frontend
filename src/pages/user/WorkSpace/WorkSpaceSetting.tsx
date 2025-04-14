import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useUserDetailsMutation } from "../../../hooks/useUserDetails";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { setSelectWorkspace, setSelectWorkspaceId } from "../../../redux/workspaceSlice";

const WorkSpaceSetting: React.FC = () => {
  const { getUserDetials } = useUserDetailsMutation();
  const { data: userDetails, isLoading } = getUserDetials
  const dispatch = useDispatch<AppDispatch>()
  const currendWorkspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId)
  const currendWorkspace = useSelector((state: RootState) => state.workspace.selectWorkspace)

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("")
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);


  const ownedWorkspace = userDetails?.data?.workspaceOwn;
  const invitedWorkspaces = (userDetails?.data?.invitedWorkspace || []).filter(
    (workspace: any) => workspace._id !== ownedWorkspace?._id
  );

  console.log("complete userDetails :", userDetails)
  console.log("selectedWorkspace form the workspace settings selectedworkspace : ", selectedWorkspace)


  useEffect(() => {
    if (currendWorkspaceId && currendWorkspace) {
      setSelectedWorkspaceId(currendWorkspaceId);
      setSelectedWorkspace(currendWorkspace);
    } else if (ownedWorkspace) {
      setSelectedWorkspaceId(ownedWorkspace._id);
      setSelectedWorkspace(ownedWorkspace);
      dispatch(setSelectWorkspaceId(ownedWorkspace._id));
      dispatch(setSelectWorkspace(ownedWorkspace));
    } else if (invitedWorkspaces.length > 0) {
      setSelectedWorkspaceId(invitedWorkspaces[0]._id);
      setSelectedWorkspace(invitedWorkspaces[0]);
      dispatch(setSelectWorkspaceId(invitedWorkspaces[0]._id));
      dispatch(setSelectWorkspace(invitedWorkspaces[0]));
    }
  }, [currendWorkspaceId, currendWorkspace, ownedWorkspace, invitedWorkspaces, dispatch]);
  

  const handleWorkspaceChange = (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId);

    const selected =
      workspaceId === ownedWorkspace?._id
        ? ownedWorkspace
        : invitedWorkspaces.find((ws: any) => ws._id === workspaceId);

    setSelectedWorkspace(selected);
    dispatch(setSelectWorkspaceId(workspaceId));
    dispatch(setSelectWorkspace(selected));
  };







  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      {/* Header with back button */}
      <div className="mb-10">
        <Link
          to="/project"
          className="flex items-center text-gray-400 hover:text-white"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back to project</span>
        </Link>
      </div>

      {/* Main content container */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 justify-center border-b border-[#5A6060] py-6">
        {/* Left side - Workspace Settings */}
        <div>
          <h1 className="text-3xl font-medium mb-3">Workspace Settings</h1>
          <p className="text-gray-400 mb-6">
            Manage your workspaces and switch between them easily. Edit workspace
            details anytime in settings.
          </p>

          {/* Workspace Selector */}
          <div className="mb-4">
            <label className="block mb-2 text-white">
              Select Workspace
            </label>
            <select
              className="w-full bg-[#2E3033] border border-[#404348] rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
              value={selectedWorkspaceId}
              onChange={(e) => handleWorkspaceChange(e.target.value)}
            >
              {/* Owned Workspace */}
              {ownedWorkspace && <optgroup label="Owned Workspace">
                <option value={ownedWorkspace?._id}>
                  {ownedWorkspace?.name} (Owned)
                </option>
              </optgroup>}

              {/* Invited Workspaces */}
              {invitedWorkspaces?.length > 0 && (
                <optgroup label="Invited Workspaces">
                  {invitedWorkspaces?.map((workspace: any) => (
                    <option key={workspace._id} value={workspace._id}>
                      {workspace.name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* Workspace Details */}
          <div className="mb-4">
            <h3 className="text-xl font-medium mb-2">Workspace Details</h3>
            {selectedWorkspace ? (
              <>
                <p className="text-gray-400">Workspace Name : {selectedWorkspace.name}</p>
                <p className="text-gray-400">Owner Name : {selectedWorkspace.owner.fullName || "You"}</p>
              </>) : (
              <p className="text-gray-400">Please select a workspace.</p>
            )}

          </div>
        </div>

        {/* Right side - Placeholder for additional content (optional) */}
        <div className="hidden md:block">
          {/* You can add a placeholder or component here like AddProjectRightItem */}
          <div className="bg-[#2E3033] border border-[#404348] rounded p-4 text-gray-400">
            <p>Additional workspace info or actions can go here.</p>
          </div>
        </div>
      </div>

      {/* Footer buttons */}
      {/* <div className="mt-4 flex justify-end max-w-4xl mx-auto">
      <button className="bg-[#2E3033] text-white px-4 py-2 rounded mr-4 hover:bg-[#3E4043]">
        Cancel
      </button>
      <button className="bg-[#0052CC] text-white px-4 py-2 rounded hover:bg-[#0065FF]">
        Save Changes
      </button>
    </div> */}
    </div>
  );
};

export default WorkSpaceSetting;
