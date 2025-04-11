import api from "../api/axiosInstance"
import { ProjectTeamData } from "../types/projectTeamData";

export const createProjectWithTeamApi = async (data: ProjectTeamData) => {
    const response = await api.post("project/createprojectandteam", data)
    return response.data;
}


export const getAllProjectsApi = async (workspaceId: string) => {
    const response = await api.get("project/all-projects", { params: { workspaceId } })
    return response
}

export const getProjectByIdApi = async (projectId: string) => {
    const response = await api.get(`project/project-by-id/${projectId}`)
    return response;
}