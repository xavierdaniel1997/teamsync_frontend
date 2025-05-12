export type SprintStatus = "PLANNED" | "ACTIVE" | "COMPLETED";

export interface ISprint {
  _id: string;
  project: string;
  workspace: string;
  sprintName: string;
  goal?: string;
  startDate?: string; 
  endDate?: string;
  status: SprintStatus;
  tasks: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSprintData {
  projectId: string;
  workspaceId: string;
  goal?: string;
  startDate?: string;
  endDate?: string;
}