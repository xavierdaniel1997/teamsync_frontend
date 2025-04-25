

export enum TaskType {
    EPIC = "EPIC",
    STORY = "STORY",
    SUBTASK = "SUBTASK",
    BUG = "BUG",
  }
  
  export enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
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
    _id?: string;
    project: string;
    workspace: string;
    taskKey: string;
    title: string;
    description?: string;
    type: TaskType;
    status: TaskStatus;
    priority: TaskPriority;
    assignee?: string;
    reporter?: string;
    epic?: string;
    parent?: string;
    sprint?: string;
    storyPoints?: number;
    files?: IFile;
    createdAt: string;
    updatedAt: string;
  }

  export type TaskResponse = {
    success: boolean;
    status: number;
    message: string;
    data: ITask[];
  };
  