export interface IProject {
    _id: string;
    name: string;
    projectkey: string;
    description: string;
    workspace: {
      _id: string;
      name: string;
    };
    owner: {
      _id: string;
      email: string;
      fullName: string;
    };
    members: Array<{
      _id: string;
      email: string;
      fullName: string;
    }>;
    backlog?: any[]; 
    sprints?: any[];
    createdAt: string;
    __v?: number;
  }
  
  export interface ProjectResponse {
    data: IProject[];
    message: string;
    status: number;
    success: boolean;
  }