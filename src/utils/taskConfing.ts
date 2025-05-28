
import { TaskStatus, } from "../types/task";


export const statusTypes = [
  {
    id: TaskStatus.TO_DO,
    label: "TO DO",
    bgColor: "bg-gray-600",
    textColor: "text-gray-200",
  },
  {
    id: TaskStatus.IN_PROGRESS,
    label: "IN PROGRESS",
    bgColor: "bg-blue-600",
    textColor: "text-blue-100",
  },
  // {
  //   id: TaskStatus.IN_REVIEW,
  //   label: "IN REVIEW",
  //   bgColor: 'bg-red-600',
  //   textColor: "text-red-100"
  // },
  {
    id: TaskStatus.DONE,
    label: "DONE",
    bgColor: "bg-green-600",
    textColor: "text-green-100",
  },
];
