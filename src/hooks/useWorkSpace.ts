import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { createWorkSpaceApi, getWorkSpaceApi } from '../services/workSpaceService';

export const useWorkSpaceMutation= () => {
    const queryClient = useQueryClient();

    const useCreateWorkSpace = useMutation({
        mutationFn: createWorkSpaceApi,
        onSuccess: (response) => {
            console.log("Workspace created successfully", response)
            queryClient.invalidateQueries({ queryKey: ["workspace"] });
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