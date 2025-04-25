import api from "../api/axiosInstance"
import { ProjectTeamData } from "../types/projectTeamData";
import { ITask } from "../types/task";

export const createProjectWithTeamApi = async (data: ProjectTeamData) => {
    const response = await api.post("project/createprojectandteam", data)
    return response.data;
}


export const getAllProjectsApi = async (workspaceId: string) => {
    const response = await api.get("project/all-projects", { params: { workspaceId } })
    return response.data
}

export const getProjectByIdApi = async (projectId: string) => {
    const response = await api.get(`project/project-by-id/${projectId}`)
    return response.data;
}



//task related apis

export const createTaskApi = async (task: Partial<ITask>) => {
    console.log("data i got in the createTaskApi", task)
    const response = await api.post("project/create-task", task)
    return response.data;
}


export const getEpicsByProjectApi = async (projectId: string) => {
    const response = await api.get(`project/project-epics/${projectId}`)
    return response.data;
}


export const updateTaskApi = async (taskId: string, task: Partial<ITask>) => {
    const response = await api.put(`project/update-task/${taskId}`, task)
    return response.data;
}