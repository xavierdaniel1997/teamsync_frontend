import React, { useEffect, useState } from "react";
import { useAdminWorkspaceManagmentMutation } from "../../../hooks/useAdminWorkspaceManagment";
import BreadCrumb from "../../../components/globa/BreadCrumb";
import ReusableTable from "../../../components/globa/ReusableTable";

interface WorkspaceData {
  _id: string;
  name: string;
  owner: { fullName: string; email: string; secondName?: string; avatar?: string };
  members: any[];
  projects: any[];
  plan: string;
  subscription?: {
    status?: string;
    expiresAt?: string;
    plan?: string;
  };
  createdAt: string;
}

// Define columns for the workspace table
const columns = [
  { field: "name", label: "Workspace Name" },
  { field: "owner.fullName", label: "Owner" },
  { field: "members.length", label: "Members" },
  { field: "projects.length", label: "Projects" },
  // { field: "plan", label: "Plan" },
  { field: "subscription.status", label: "Subscription Status" },
  { field: "subscription.expiresAt", label: "Subscription Expires" },
  { field: "createdAt", label: "Created At" },
];

const Companies: React.FC = () => {
  const { getAllWorkspace } = useAdminWorkspaceManagmentMutation();
  const { data: workspaceData, isLoading, error } = getAllWorkspace;
  const [workspaces, setWorkspaces] = useState<WorkspaceData[]>([]);

  console.log("Workspace details from the admin workspace:", workspaceData);

  useEffect(() => {
    if (workspaceData?.data) {
      // Format dates for display
      const formattedWorkspaces = workspaceData.data.map((workspace: WorkspaceData) => ({
        ...workspace,
        createdAt: new Date(workspace.createdAt).toLocaleDateString(),
        subscription: workspace.subscription
          ? {
              ...workspace.subscription,
              expiresAt: workspace.subscription.expiresAt
                ? new Date(workspace.subscription.expiresAt).toLocaleDateString()
                : "N/A",
            }
          : undefined,
      }));
      setWorkspaces(formattedWorkspaces);
    }
  }, [workspaceData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as any).message}</div>;

  return (
    <div className="text-white">
      <BreadCrumb pageName="Workspace Details" />
      <div className="px-5">
        <ReusableTable
          columns={columns}
          data={workspaces}
          isPagination={false} 
        />
      </div>
    </div>
  );
};

export default Companies;