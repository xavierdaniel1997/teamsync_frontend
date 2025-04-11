import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProjectWithTeamApi, getAllProjectsApi } from "../services/projectService"
import { toast } from "sonner"

export const useProject = () => {
    const queryClient = useQueryClient()

    const useCreateProjectWithTeam = useMutation({
        mutationFn: createProjectWithTeamApi,
        onSuccess: () => {
            console.log("project created successfully")
            queryClient.invalidateQueries({ queryKey: ["project"] });
        },
        onError: (error: any) => {
            console.log("failed to create the project", error)
            toast.error(error?.response?.data?.message)
        }
    })


    const useGetProjects = (workspaceId?: string) => {
        return useQuery<{ data: any[] }, Error>({
            queryKey: ["project", workspaceId],
            queryFn: () =>
                workspaceId ? getAllProjectsApi(workspaceId) : Promise.resolve({ data: [] }),
            enabled: !!workspaceId,
        });
    };

    return { useCreateProjectWithTeam, useGetProjects }
}