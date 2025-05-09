import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProjectWithTeamApi, createSprintApi, createTaskApi, deleteSprintApi, getAllProjectsApi, getBacklogTasksApi, getEpicsByProjectApi, getProjectByIdApi, getSprintApi, updateProjectApi, updateTaskApi } from "../services/projectService"
import { toast } from "sonner"
import { IProject, ProjectResponse } from "../types/project"
import { ITask, TaskResponse } from "../types/task"
import { setSelectProject } from "../redux/projectSlice"
import { useDispatch } from "react-redux"

export const useProject = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

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

  const useUpdateProject = useMutation({
    mutationFn: ({ projectId, workspaceId, data }: { projectId: string; workspaceId: string; data: FormData }) =>
      updateProjectApi(projectId, workspaceId, data),
    onSuccess: (response) => {
      console.log("Project updated successfully");
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["projectById"] });
      dispatch(setSelectProject(response?.data))
      toast.success("Project updated successfully");
    },
    onError: (error: any) => {
      console.log("Failed to update the project", error);
      toast.error(error?.response?.data?.message || "Failed to update project");
    },
  });


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
      console.log("task created successfully variables", response)
      queryClient.invalidateQueries({ queryKey: ["project"] })
      queryClient.invalidateQueries({ queryKey: ["task"] });
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
      queryClient.invalidateQueries({ queryKey: ["project", ] });
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

  const useGetBacklogTasks = (projectId: string) => {
    return useQuery({
      queryKey: ["task", projectId],
      queryFn: () => getBacklogTasksApi(projectId!),
      enabled: !!projectId
    })
  }

  //sprint section

  const useCreateSprint = useMutation({
    mutationFn: createSprintApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sprints"] });
      console.log("sprint created successfully")
    },
    onError: (error: any) => {
      console.log("failed to create the sprint", error)
      toast.error(error?.response?.data?.message)
    }
  })



  const useGetSprints = (projectId: string | null) => {
    return useQuery({
      queryKey: ["sprints", projectId],
      queryFn: () => getSprintApi(projectId!),
      enabled: !!projectId
    })
  }

  const useDeleteSprint = useMutation({
    mutationFn: deleteSprintApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sprints'] });
      toast.success('Sprint deleted successfully');
    },
    onError: (error: any) => {
      console.error('Failed to delete the sprint', error);
      toast.error(error?.response?.data?.message || 'Failed to delete sprint');
    }
  })


  return { useCreateProjectWithTeam, useUpdateProject, useGetProjects, useGetProjectById, useCreateTask, useGetEpic, useUpdateTask, useCreateSprint, useGetSprints, useDeleteSprint, useGetBacklogTasks}
}