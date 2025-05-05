import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllWorkspaceApi } from "../services/adminWorkspaceManagmentService"


export const useAdminWorkspaceManagmentMutation = () => {
    const queryClient = useQueryClient()

    const getAllWorkspace = useQuery({
        queryKey: ['adminWorkspaceDetails'],
        queryFn: getAllWorkspaceApi
    })

    return {getAllWorkspace}
}