import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProjectWithTeamApi, createSprintApi, createTaskApi, deleteSprintApi, deleteTaskApi, getAllProjectsApi, getAllTaskByProjectsApi, getBacklogTasksApi, getEpicsByProjectApi, getProjectByIdApi, getSprintApi, getTaskFromSprintApi, inviteMemeberToProjectApi, startSprintApi, updateProjectApi, updateTaskApi } from "../services/projectService"
import { toast } from "sonner"
import { IProject, ProjectResponse } from "../types/project"
import { ITask, TaskResponse } from "../types/task"
import { setSelectProject } from "../redux/projectSlice"
import { useDispatch } from "react-redux"
import InviteTeamModal from "../components/user/InviteTeamModal"
import { IStartSprint } from "../types/sprint"

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

  const useInviteMember = useMutation({
    mutationFn: ({ projectId, workspaceId, emails }: { projectId: string; workspaceId: string; emails: string[] }) => inviteMemeberToProjectApi(projectId, workspaceId, emails),
    onSuccess: (response) => {
      console.log("invite member and accesslevel set successfully", response);
      toast.success(response.message || "Invited Members successfully");
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["projectById"] });
      dispatch(setSelectProject(response?.data))
    },
    onError: (error: any) => {
      console.log("Failed to invite team member to the project", error);
      toast.error(error?.response?.data?.message || "Failed to invite team member to the project");
    },
  })


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
    mutationFn: ({ workspaceId, projectId, taskId, task }: { workspaceId: string, projectId: string, taskId: string; task: Partial<ITask> }) =>
      updateTaskApi(workspaceId, projectId, taskId, task),
    onSuccess: (response) => {
      console.log("task updated successfully", response);
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
    onError: (error: any) => {
      console.log("failed to update the task", error);
      toast.error(error?.response?.data?.message || "Failed to update task");
    },
  })

  const useDeleteTask = useMutation({
    mutationFn: ({ workspaceId, projectId, taskId }: { workspaceId: string, projectId: string, taskId: string }) =>
      deleteTaskApi(workspaceId, projectId, taskId),
    onSuccess: (response) => {
      console.log("task deleted successfully", response)
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
    onError: (error: any) => {
      console.log("failed to delete the task", error);
      toast.error(error?.response?.data?.message || "Failed to delete the task")
    }

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

  const useGetSprintTasks = (workspaceId: string, projectId: string, sprintId: string) => {
    return useQuery<TaskResponse, Error>({
      queryKey: ["task", workspaceId, projectId, sprintId],
      queryFn: () => getTaskFromSprintApi(workspaceId, projectId, sprintId),
      enabled: !!workspaceId && !!projectId && !!sprintId,
    });
  };

  const useGetTasksByProject = (workspaceId: string, projectId: string) => {
    return useQuery<TaskResponse>({
      queryKey: ["task", workspaceId, projectId],
      queryFn: () => getAllTaskByProjectsApi(workspaceId, projectId),
      enabled: !!workspaceId && !!projectId
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
    mutationFn: ({workspaceId, projectId, sprintId}: {workspaceId: string, projectId: string, sprintId: string}) => deleteSprintApi(workspaceId, projectId, sprintId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sprints'] });
      queryClient.invalidateQueries({queryKey: ['task']})
      toast.success('Sprint deleted successfully');
    },
    onError: (error: any) => {
      console.error('Failed to delete the sprint', error);
      toast.error(error?.response?.data?.message || 'Failed to delete sprint');
    }
  })


  const useStartSprint = useMutation({
    mutationFn: ({workspaceId, projectId, sprintId, data}: {workspaceId: string, projectId: string, sprintId: string, data: IStartSprint}) => startSprintApi(workspaceId, projectId, sprintId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['sprints']});
      console.log("sprint started successfully")
    },
    onError: (error: any) => {
      console.log("failed to start the sprint", error)
    }
  })


  return {
    useCreateProjectWithTeam,
    useUpdateProject,
    useGetProjects,
    useGetProjectById,
    useCreateTask,
    useDeleteTask,
    useGetEpic,
    useUpdateTask,
    useCreateSprint,
    useGetSprints,
    useDeleteSprint,
    useGetBacklogTasks,
    useInviteMember,
    useGetSprintTasks,
    useGetTasksByProject,
    useStartSprint,
  }
}