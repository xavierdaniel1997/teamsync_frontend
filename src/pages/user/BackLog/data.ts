interface Task {
    keyName: string;
    title: string;
    label?: string;
    status?: string;
    assignee?: string;
  }
  
  export const dummyTasks: Task[] = [
    {
      keyName: "PROJ-101",
      title: "Implement user authentication",
      label: "Feature",
      status: "TO DO",
      assignee: "John Doe",
    },
    {
      keyName: "PROJ-102",
      title: "Design landing page",
      label: "Design",
      status: "IN PROGRESS",
      assignee: "Jane Smith",
    },
    {
      keyName: "PROJ-103",
      title: "Fix login bug",
      label: "Bug",
      status: "TO DO",
      assignee: "Alex Brown",
    },
  ];
  
  // Split tasks for backlog and sprint
  export const backlogTasks: Task[] = dummyTasks.filter(task => task.status === "TO DO" || task.status === "IN PROGRESS");
  export const sprintTasks: Task[] = dummyTasks.filter(task => task.status === "IN PROGRESS" || task.status === "DONE");