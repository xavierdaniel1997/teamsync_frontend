import api from "../api/axiosInstance"

export const getListMemberApi = async(workspaceId: string, projectId: string) => {
    const response = await api.get(`chat/all-members/${workspaceId}/${projectId}`);
    return response.data;
}