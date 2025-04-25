import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProjectWithTeamApi, createTaskApi, getAllProjectsApi, getEpicsByProjectApi, getProjectByIdApi, updateTaskApi } from "../services/projectService"
import { toast } from "sonner"
import { ProjectResponse } from "../types/project"
import { ITask, TaskResponse } from "../types/task"

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
    return useQuery<ProjectResponse, Error>({
      queryKey: ["project", workspaceId],
      queryFn: () =>
        workspaceId ? getAllProjectsApi(workspaceId) : Promise.resolve({ data: [], message: "", status: 200, success: true }),
      enabled: !!workspaceId,
    });
  };

  const useGetProjectById = (projectId: string | null) => {
    return useQuery({
      queryKey: ["projectById", projectId],
      queryFn: () => getProjectByIdApi(projectId!),
      enabled: !!projectId,
    });
  };


  //task related api's

  const useCreateTask = useMutation({
    mutationFn: createTaskApi,
    onSuccess: (response) => {
      console.log("task created successfully", response)
      queryClient.invalidateQueries({ queryKey: ["project"] })
    },
    onError: (error) => {
      console.log("failed to create the task", error)
    }
  })

  const useUpdateTask = useMutation({
    mutationFn: ({ taskId, task }: { taskId: string; task: Partial<ITask> }) =>
      updateTaskApi(taskId, task),
    onSuccess: (response) => {
      console.log("task updated successfully", response);
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Task updated successfully");
    },
    onError: (error: any) => {
      console.log("failed to update the task", error);
      toast.error(error?.response?.data?.message || "Failed to update task");
    },
  })


  const useGetEpic = (projectId: string) => {
    return useQuery({
      queryKey: ["project", projectId],
      queryFn: () => getEpicsByProjectApi(projectId!),
      enabled: !!projectId,
    })
  }

  return { useCreateProjectWithTeam, useGetProjects, useGetProjectById, useCreateTask, useGetEpic, useUpdateTask}
}