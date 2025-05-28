import api from "../api/axiosInstance"
import { IProject } from "../types/project";
import { ProjectTeamData } from "../types/projectTeamData";
import { CreateSprintData, IStartSprint } from "../types/sprint";
import { ITask } from "../types/task";

export const createProjectWithTeamApi = async (data: ProjectTeamData) => {
    const response = await api.post("project/createprojectandteam", data)
    return response.data;
}

export const updateProjectApi = async (projectId: string, workspaceId: string, data: FormData) => {
    const response = await api.put(`project/edit-project/${projectId}/${workspaceId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
          },
    })
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


export const inviteMemeberToProjectApi = async (projectId: string, workspaceId: string, emails: string[]) => {
    const response = await api.post(`project/invite-member/${projectId}/${workspaceId}`, {emails})
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


export const updateTaskApi = async (workspaceId: string, projectId: string, taskId: string, task: Partial<ITask>) => {
    const response = await api.put(`project/update-task/${workspaceId}/${projectId}/${taskId}`, task)
    return response.data;
}


export const deleteTaskApi = async (workspaceId: string, projectId: string, taskId: string) => {
    const response = await api.delete(`project/delete-task/${workspaceId}/${projectId}/${taskId}`)
    return response.data;
}

export const getBacklogTasksApi = async (projectId: string) => {
    const response = await api.get(`project/backlog-tasks/${projectId}`)
    return response.data;
}

export const getTaskFromSprintApi = async (workspaceId: string, projectId: string, sprintId: string) => {
    const response = await api.get(`project/sprint-tasks/${workspaceId}/${projectId}/${sprintId}`)
    return response.data;
}


export const getAllTaskByProjectsApi = async (workspaceId: string, projectId: string) => {
    const response = await api.get(`project/all-tasks/${workspaceId}/${projectId}`)
    return response.data;
}

export const getActiveSprintTaskApi = async (workspaceId: string, projectId: string) => {
    const response = await api.get(`project/active-tasks/${workspaceId}/${projectId}`)
    return response.data;
}

// sprint related apis

export const createSprintApi = async (data: CreateSprintData) => {
    const response = await api.post("project/create-sprint", data)
    return response.data;
} 

export const getSprintApi = async (projectId: string) => {
    const response = await api.get(`project/sprints/${projectId}`)
    return response.data
}

export const deleteSprintApi = async (workspaceId: string, projectId: string ,sprintId: string) => {
    const response = await api.delete(`project/delete-sprint/${workspaceId}/${projectId}/${sprintId}`)
    return response.data;
}

export const startSprintApi = async (workspaceId: string, projectId: string ,sprintId: string, data: IStartSprint) => {
    const response = await api.post(`project/start-sprint/${workspaceId}/${projectId}/${sprintId}`, data);
    return response.data;
}