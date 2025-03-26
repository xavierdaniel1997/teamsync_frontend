import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {  createPlanApi, getPlanApi } from "../services/planService";


export const usePlanMutation = () => {
    const queryClient = useQueryClient();

    const useCreatePlan = useMutation({
        mutationFn: createPlanApi,
        onSuccess: (response) => {
            console.log("Plan added successfully", response)
            queryClient.invalidateQueries({ queryKey: ["plans"] });
        },
        onError: (error) => {
            console.log("Error creating plan", error)
        }
    })

    const useGetPlan = useQuery({
        queryKey: ['plans'],
        queryFn: getPlanApi,
    })

    return {useCreatePlan, useGetPlan}
}