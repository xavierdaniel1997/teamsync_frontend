import api from "../api/axiosInstance"

export const getListMemberApi = async(workspaceId: string, projectId: string) => {
    const response = await api.get(`chat/all-members/${workspaceId}/${projectId}`);
    return response.data;
}



export const getMessagesApi = async (projectId: string, recipientId: string) => {
  const response = await api.get(`chat/messages/${projectId}`, {
    params: { recipientId },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
    },
  });
  return response.data.data; 
};