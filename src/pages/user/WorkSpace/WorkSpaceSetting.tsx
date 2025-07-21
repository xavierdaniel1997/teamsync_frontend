import React, { useEffect, useState } from "react";
import { FaArrowLeft} from "react-icons/fa";
import {
  IoSettingsSharp,
  IoStatsChart,
} from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { FiPackage, FiPlus } from "react-icons/fi";
import { useUserDetailsMutation } from "../../../hooks/useUserDetails";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  setSelectWorkspace,
  setSelectWorkspaceId,
} from "../../../redux/workspaceSlice";
import {
  setSelectProject,
  setSelectProjectId,
} from "../../../redux/projectSlice";
import { useSubscriptionMutation } from "../../../hooks/useSubscription";
import BreadCrumb from "../../../components/globa/BreadCrumb";
import WorkspaceOverview from "./WorkspaceOverview";
import WorkspaceSubscription from "./WorkspaceSubscription";
import WorkspaceSettingForm from "./WorkspaceSettingForm";
import { formatDate } from "../../../utils/formatDate";

const WorkSpaceSetting: React.FC = () => {
  const { getUserDetials } = useUserDetailsMutation();
  const { useGetMySubscription } = useSubscriptionMutation();
  const { data: userDetails } = getUserDetials;
  const { data: subscriptionPlan } = useGetMySubscription;
  const dispatch = useDispatch<AppDispatch>();
  const currendWorkspaceId = useSelector(
    (state: RootState) => state.workspace.selectWorkspaceId
  );
  const currendWorkspace = useSelector(
    (state: RootState) => state.workspace.selectWorkspace
  );

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("");
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const ownedWorkspace = userDetails?.data?.workspaceOwn;
  const invitedWorkspaces = (userDetails?.data?.invitedWorkspace || []).filter(
    (workspace: any) => workspace._id !== ownedWorkspace?._id
  );

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
  }, [
    currendWorkspaceId,
    currendWorkspace,
    ownedWorkspace,
    invitedWorkspaces,
    dispatch,
  ]);

  const handleWorkspaceChange = (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId);

    const selected =
      workspaceId === ownedWorkspace?._id
        ? ownedWorkspace
        : invitedWorkspaces.find((ws: any) => ws._id === workspaceId);

    setSelectedWorkspace(selected);
    dispatch(setSelectWorkspaceId(workspaceId));
    dispatch(setSelectWorkspace(selected));
    dispatch(setSelectProject(null));
    dispatch(setSelectProjectId(null));
  };

  const getSubscriptionDetails = () => {
    const plan = subscriptionPlan?.data?.plan || {};
    return {
      name: plan.name || "Free",
      price: plan.price || 0,
      status: subscriptionPlan?.data?.status || "INACTIVE",
      expiresAt: subscriptionPlan?.data?.expiresAt
        ? formatDate(subscriptionPlan.data.expiresAt)
        : "N/A",
      createdAt: subscriptionPlan?.data?.createdAt
        ? formatDate(subscriptionPlan.data.createdAt)
        : "N/A",
    };
  };

  const subscription = getSubscriptionDetails();
  // const projectCount = selectedWorkspace?.projects?.length || 0;
  // const memberCount = selectedWorkspace?.members?.length || 0;

  const myProjectCount = ownedWorkspace?.projects?.length || 0;
  const myMemberCount = ownedWorkspace?.members?.length || 0;

  const handleCreateWorkspace = () => {
    navigate("/create-work-space");
  };

  const TabButton = ({
    id,
    icon,
    label,
  }: {
    id: string;
    icon: React.ReactNode;
    label: string;
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${activeTab === id
          ? "bg-[#0052cc57] text-white"
          : "text-gray-300 hover:bg-[#2A2A2A] hover:text-white"
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#191919] text-white p-6">
      <div className="mb-8">
        <Link
          to="/project"
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back to Project</span>
        </Link>
      </div>

      <div className="mx-60">
        <div>
          <h1 className="mx-5 my-4 text-xl font-semibold text-gray-200">
            Workspace Mangement
          </h1>

        </div>

        <div className="bg-[#202020] rounded-md px-10 py-6 shadow-md mt-4 mx-4">
          <div className="flex flex-1 items-center gap-10">
            <div className="flex flex-col gap-2 items-center mb-4">
              <div className="flex justify-center">
                <div className="ml-3 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                  {selectedWorkspace?.name
                    ? selectedWorkspace?.name.charAt(0).toUpperCase() +
                    selectedWorkspace?.name.charAt(1).toUpperCase()
                    : "?"}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="font-semibold">{selectedWorkspace?.name}</h3> 
                <p className="text-gray-400 text-sm">
                  Created{" "}
                  {selectedWorkspace?.createdAt
                    ? formatDate(selectedWorkspace?.createdAt)
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end flex-2">
              <div className="w-full">
                <label className="block mb-2 text-gray-300 font-medium">
                  Select Workspace
                </label>
                <div className="relative w-auto">
                  <select
                    className="w-full bg-[#2E3033] border border-[#404348] rounded-sm px-4 py-2 text-white focus:outline-none focus:ring-1 appearance-none cursor-pointer"
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
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FaChevronDown />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4">
          <div className="my-5">
            <BreadCrumb
              pageName="My Workspace"
              buttonText="Create New Workspace"
              onButtonClick={handleCreateWorkspace}
              buttonBg="#d72020"
              ButtonIcon={FiPlus}
              disabled={!!ownedWorkspace}
            />
          </div>

                    
          {ownedWorkspace && <div className="">
            <div className="col-span-12 md:col-span-3">
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <TabButton
                    id="overview"
                    icon={<IoStatsChart size={18} />}
                    label="Overview"
                  />
                  <TabButton
                    id="subscription"
                    icon={<FiPackage size={18} />}
                    label="Subscription"
                  />
                  <TabButton
                    id="settings"
                    icon={<IoSettingsSharp size={18} />}
                    label="Settings"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-6 pb-6">
              <div className="col-span-12 md:col-span-9 ">
                {activeTab === "overview" && (
                  <WorkspaceOverview
                    workspaceName={ownedWorkspace?.name}
                    subscriptionName={subscription.name}
                    projectCount={myProjectCount}
                    memberCount={myMemberCount}
                    subscriptionStatus={subscription.status}
                    subscriptionPrice={subscription.price}
                    subscriptionCreatedAt={subscription.createdAt}
                    subscriptionExpiresAt={subscription.expiresAt}
                  />
                )}
                {activeTab === "subscription" && <WorkspaceSubscription
                  subscriptionName={subscription.name}
                  subscriptionStatus={subscription.status}
                  subscriptionPrice={subscription.price}
                  subscriptionCreatedAt={subscription.createdAt}
                  subscriptionExpiresAt={subscription.expiresAt}
                />}
                {activeTab === "settings" && <WorkspaceSettingForm workspaceName={ownedWorkspace?.name} workspaceCreatedAt={ownedWorkspace?.createdAt}/>}
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceSetting;
