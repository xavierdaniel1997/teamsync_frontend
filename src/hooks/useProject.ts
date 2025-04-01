import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProjectWithTeamApi } from "../services/projectService"

export const useProject = () => {
    const queryClient = useQueryClient()

    const useCreateProjectWithTeam = useMutation({
        mutationFn: createProjectWithTeamApi,
        onSuccess: () => {
            console.log("project created successfully")
            queryClient.invalidateQueries({ queryKey: ["project"] });
        },
        onError: () => {
            console.log("failed to create the project")
        }
    })

    return {useCreateProjectWithTeam}
}