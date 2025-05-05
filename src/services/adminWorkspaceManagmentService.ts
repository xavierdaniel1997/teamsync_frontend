import api from "../api/axiosInstance";

export const getAllWorkspaceApi =  async () => {
   const response = await api.get("workspace-managment/workspaces") 
   return response.data;
} 