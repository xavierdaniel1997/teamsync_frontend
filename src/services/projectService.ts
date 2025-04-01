import api from "../api/axiosInstance"
import { ProjectTeamData } from "../types/projectTeamData";

export const createProjectWithTeamApi = async (data: ProjectTeamData) => {
    const response = await api.post("project/createprojectandteam", data)
    return response.data;
}