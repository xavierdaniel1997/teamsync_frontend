import { BsBookmarkCheck } from "react-icons/bs";
import { RiTaskLine } from "react-icons/ri";
import { BiBug } from "react-icons/bi";
import { TaskStatus, TaskType } from "../types/task";


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
  {
    id: TaskStatus.DONE,
    label: "DONE",
    bgColor: "bg-green-600",
    textColor: "text-green-100",
  },
];
