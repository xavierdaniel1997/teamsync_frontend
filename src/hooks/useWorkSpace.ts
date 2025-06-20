import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { createWorkSpaceApi, getWorkSpaceApi } from '../services/workSpaceService';
import { useNavigate } from 'react-router-dom';
import { getuserDetilasApi } from '../services/profileDetilasService';

export const useWorkSpaceMutation= () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const useCreateWorkSpace = useMutation({
        mutationFn: createWorkSpaceApi,
        onSuccess: async (response) => {
            console.log("Workspace created successfully", response)
            queryClient.invalidateQueries({ queryKey: ["workspace"] });
            const userWorkSpace = await getuserDetilasApi();
            console.log("userdetails from useworkspacerrrrrrrrrrrrrrrrrrrrr", userWorkSpace)
            navigate("/create-project")
            // await handleWorkspaceSelection(dispatch, navigate);     
        },
        onError: (error) => {
            console.log("Error creating workspace:", error)
        }
    })

    const useGetWorkSpace = useQuery({
        queryKey:['workspace'],
        queryFn:getWorkSpaceApi,
    })

    return {useCreateWorkSpace, useGetWorkSpace}
}