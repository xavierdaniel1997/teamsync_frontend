import { useQuery } from "@tanstack/react-query"
import { getAllUserApi } from "../services/adminUserManagmentService"

export const useAdminUserManagmentMutation = () => {

    const getAllUserDetails = useQuery({
        queryKey: ['adminUserDetails'],
        queryFn: getAllUserApi
    })

    return {getAllUserDetails}
}