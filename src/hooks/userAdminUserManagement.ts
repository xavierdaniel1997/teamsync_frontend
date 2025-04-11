import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllUserApi } from "../services/adminUserManagmentService"

export const useAdminUserManagmentMutation = () => {
    const queryClient = useQueryClient()

    const getAllUserDetails = useQuery({
        queryKey: ['adminUserDetails'],
        queryFn: getAllUserApi
    })

    return {getAllUserDetails}
}