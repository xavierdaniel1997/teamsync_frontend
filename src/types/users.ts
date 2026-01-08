export interface IUser {
  _id?: string;
  email?: string;
  fullName: string;
  secondName?: string;
  avatar?: string;
  role?: string;
  completedIssues?: number;
}


export interface UserProfileFormValues {
    fullName: string;
    secondName?: string;
    email: string;
    avatar: File | null;
    coverPhoto: File | null;
  }
  