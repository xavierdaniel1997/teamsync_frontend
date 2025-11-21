import { ISprint } from "./sprint";
import { IUser } from "./users";


export enum TaskType {
    EPIC = "EPIC",
    STORY = "STORY",
    TASK = "TASK",
    SUBTASK = "SUBTASK",
    BUG = "BUG",
  }
  
  export enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    DONE = "DONE",
  }
  
  export enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
  }
  
  export interface IFile {
    url: string;
    publicId: string;
    fileName: string;
    fileType: string;
    size: number;
    uploadedAt: Date;
  }
  
  export interface ITask {
    _id: string;
    project: string;
    workspace: string;
    taskKey: string;
    title: string;
    description?: string;
    type: TaskType;
    status: TaskStatus;
    priority: TaskPriority;
    assignee?: string | IUser | null;
    reporter?: string | IUser | null;
    epicId?: string | null;
    epic?: { _id: string; title: string; taskKey: string }
    parent?: string;
    sprint?: string | null | ISprint;
    storyPoints?: number;
    files?: IFile;
    startDate: string;
    endDate: string;
    webLinks: { url: string; linkText: string }[];
    taskStatus?: string;
    createdAt: string;
    updatedAt: string;
  }

  export type TaskResponse = {
    success: boolean;
    status: number;
    message: string;
    data: ITask[];
  };
  


export interface KanbanData {
  [TaskStatus.TO_DO]: ITask[];
  [TaskStatus.IN_PROGRESS]: ITask[];
  [TaskStatus.IN_REVIEW]: ITask[];
  [TaskStatus.DONE]: ITask[];
}

export interface KanbanResponse {
  success: boolean;
  status: number;
  message: string;
  data: KanbanData;
}

export interface IKanbanColumn {
  status: TaskStatus;
  tasks: ITask[];
}