import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { createWorkSpaceApi, getWorkSpaceApi } from '../services/workSpaceService';
import { useNavigate } from 'react-router-dom';

export const useWorkSpaceMutation= () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const useCreateWorkSpace = useMutation({
        mutationFn: createWorkSpaceApi,
        onSuccess: (response) => {
            console.log("Workspace created successfully", response)
            queryClient.invalidateQueries({ queryKey: ["workspace"] });
            navigate("/create-project")
            
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