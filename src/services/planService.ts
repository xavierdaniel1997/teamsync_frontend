import api from "../api/axiosInstance";
import { CreatePlan } from "../types/plan";


export const createPlanApi = async (data: CreatePlan) => {
    const response = await api.post("admin/create-plan", data)
    return response.data;
}

export const getPlanApi = async () => {
    const response = await api.get("admin/get-plans")
    return response.data;
}