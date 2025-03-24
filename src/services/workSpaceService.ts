import api from "../api/axiosInstance"
import { createWorkSpace } from "../types/workSpace";

export const createWorkSpaceApi = async (data: createWorkSpace) => {
    const response = await api.post("workSpace/create-work-space", data)
    return response.data;
}