import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProjectWithTeamApi, createSprintApi, createTaskApi, deleteProjectApi, deleteSprintApi, deleteTaskApi, getActiveSprintTaskApi, getAllProjectsApi, getAllTaskByProjectsApi, getBacklogTasksApi, getEpicsByProjectApi, getKanbanTaskApi, getProjectByIdApi, getSprintApi, getTaskFromSprintApi, inviteMemeberToProjectApi, startSprintApi, updateKanbanTaskApi, updateProjectApi, updateTaskApi } from "../services/projectService"
import { toast } from "sonner"
import { ProjectResponse } from "../types/project"
import { TaskResponse } from "../types/task"
import { setSelectProject, setSelectProjectId } from "../redux/projectSlice"
import { useDispatch } from "react-redux"
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

  const useDeleteProject = useMutation({
    mutationFn: ({projectId, workspaceId}: {projectId: string, workspaceId: string}) => deleteProjectApi(projectId, workspaceId),
    onSuccess: (response) => {
      toast.success(response.message || "Project deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["projectById"] });
      dispatch(setSelectProject(null))
      dispatch(setSelectProjectId(null))
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete the project")
    }
  })

  //task related api's

  const useCreateTask = useMutation({
    mutationFn: createTaskApi,
    onSuccess: (response) => {
      console.log("task created successfully variables", response)
      queryClient.invalidateQueries({ queryKey: ["project"] })
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
    onError: (error: any) => {
      console.log("failed to create the task", error)
      toast.error(error?.response?.data?.message)
    }
  })

  // const useUpdateTask = useMutation({
  //   mutationFn: ({ workspaceId, projectId, taskId, task }: { workspaceId: string, projectId: string, taskId: string; task: Partial<ITask> }) =>
  //     updateTaskApi(workspaceId, projectId, taskId, task),
  //   onSuccess: (response) => {
  //     console.log("task updated successfully", response);
  //     queryClient.invalidateQueries({ queryKey: ["project"] });
  //     queryClient.invalidateQueries({ queryKey: ["task"] });
  //     queryClient.invalidateQueries({ queryKey: ["activeTask"] });
  //   },
  //   onError: (error: any) => {
  //     console.log("failed to update the task", error);
  //     toast.error(error?.response?.data?.message || "Failed to update task");
  //   },
  // })

  const useUpdateTask = useMutation({
    mutationFn: ({
      workspaceId,
      projectId,
      taskId,
      task,
    }: {
      workspaceId: string;
      projectId: string; 
      taskId: string;
      task: FormData;
    }) => updateTaskApi(workspaceId, projectId, taskId, task),
    onSuccess: (response) => {
      console.log("Task updated successfully", response);
      queryClient.invalidateQueries({ queryKey: ["project"] });
      queryClient.invalidateQueries({ queryKey: ["task"] });
      queryClient.invalidateQueries({ queryKey: ["activeTask"] });
      // toast.success("Task updated successfully");
    },
    onError: (error: any) => {
      console.error("Failed to update the task", error);
      toast.error(error?.response?.data?.message || "Failed to update task");
    },
  });

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

  const useGetTasksByProject = (workspaceId: string, projectId: string, assignees?: string[], epics?: string[]) => {
    return useQuery<TaskResponse>({
      queryKey: ["task", workspaceId, projectId, assignees, epics],
      queryFn: () => getAllTaskByProjectsApi(workspaceId, projectId, assignees, epics),
      enabled: !!workspaceId && !!projectId
    })
  }

  const useGetActiveSprintTask = (workspaceId: string, projectId: string) => {
    return useQuery<TaskResponse>({
      queryKey: ['activeTask', workspaceId, projectId],
      queryFn: () => getActiveSprintTaskApi(workspaceId, projectId),
      enabled: !!workspaceId && !!projectId
    })
  }

  const useGetKanbanTasks = (workspaceId: string, projectId: string, assignees?: string[], epics?: string[]) => {
    return useQuery<TaskResponse>({
      queryKey: ['activeTask', workspaceId, projectId, assignees, epics],
      queryFn: () => getKanbanTaskApi(workspaceId, projectId, assignees, epics),
      enabled: !!workspaceId && !!projectId
    })
  }


  const useUpdateKanbanTask = useMutation({
    mutationFn: ({workspaceId, projectId, taskId, taskstatus}: {workspaceId: string, projectId: string, taskId: string, taskstatus: string}) => 
      updateKanbanTaskApi(workspaceId, projectId, taskId, taskstatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeTask"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message)
    }
  })

//   const useUpdateKanbanTask = useMutation({
//   mutationFn: ({ workspaceId, projectId, taskId, taskstatus }: {workspaceId: string, projectId: string, taskId: string, taskstatus: string}) => 
//     updateKanbanTaskApi(workspaceId, projectId, taskId, taskstatus),
//   onMutate: async ({ workspaceId, projectId, taskId, taskstatus }) => {
//     await queryClient.cancelQueries({ queryKey: ["activeTask"] });
//     const previousTasks = queryClient.getQueryData(["activeTask"]);
//     queryClient.setQueryData(["activeTask"], (old: any) => ({
//       ...old,
//       tasks: old.tasks.map((task: any) =>
//         task.id === taskId ? { ...task, status: taskstatus } : task
//       ),
//     }));
//     return { previousTasks };
//   },
//   onError: (error: any, variables, context) => {
//     queryClient.setQueryData(["activeTask"], context?.previousTasks);
//     toast.error(error?.response?.data?.message ?? "Failed to update task");
//   },
//   onSettled: () => {
//     queryClient.invalidateQueries({ queryKey: ["activeTask"] });
//   },
// });

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
    useDeleteProject,
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
    useGetActiveSprintTask,
    useGetKanbanTasks,
    useUpdateKanbanTask
  }
}