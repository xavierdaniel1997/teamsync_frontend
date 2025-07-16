import { IUser } from "./users";

interface Member {
  _id: string;
  accessLevel: "OWNER" | "WRITE" | "READ";
  user: IUser;
}


interface Invitation{
  _id?: string;
    email?: string;
    inviter?: string;
    project?: string;
    workspace?: string;
    accessLevel: "OWNER" | "READ" | "WRITE" | "NONE";
    status?: "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
    token?: string;
    expiresAt?: Date;
    createdAt?: Date;
}

export interface IProject {
    _id: string;
    name: string;
    projectkey: string;
    title: string;
    description: string;
    projectCoverImg: string;
    color: { class: string, hex: string };
    workspace: {
      _id: string;
      name: string;
    };
    owner: {
      _id: string;
      email: string;
      fullName: string;
    };
    members: Member[];
    invitations: Invitation[]
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