import { useQuery} from "@tanstack/react-query"
import { getAllWorkspaceApi } from "../services/adminWorkspaceManagmentService"


export const useAdminWorkspaceManagmentMutation = () => {

    const getAllWorkspace = useQuery({
        queryKey: ['adminWorkspaceDetails'],
        queryFn: getAllWorkspaceApi
    })

    return {getAllWorkspace}
}