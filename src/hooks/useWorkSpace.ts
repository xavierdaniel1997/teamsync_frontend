import {useMutation, useQueryClient} from '@tanstack/react-query';
import { createWorkSpaceApi } from '../services/workSpaceService';

export const useWorkSpaceMutation= () => {
    const queryClient = useQueryClient();

    const useCreateWorkSpace = useMutation({
        mutationFn: createWorkSpaceApi,
        onSuccess: (response) => {
            console.log("Workspace created successfully", response)
        },
        onError: (error) => {
            console.log("Error creating workspace:", error)
        }
    })

    return {useCreateWorkSpace}
}