import api from "../api/axiosInstance"
import { createWorkSpace } from "../types/workSpace";

export const createWorkSpaceApi = async (data: createWorkSpace) => {
    const response = await api.post("workSpace/create-work-space", data)
    return response.data;
}


export const getWorkSpaceApi = async () => {
    const response = await api.get("workSpace/get-workspace")
    return response;
}