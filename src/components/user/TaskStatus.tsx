// components/TaskStatus.tsx
import { FC } from "react";
import { formatStatus, getStatusStyles } from "../../utils/taskStatusStyles";

interface TaskStatusProps {
  status: string;
  asSelect?: boolean;
  onChange?: (status: string) => void;
}

const TaskStatus: FC<TaskStatusProps> = ({
  status,
  asSelect = false,
  onChange,
}) => {
  const { bg, text } = getStatusStyles(status);
  const displayStatus = formatStatus(status);

  if (asSelect) {
    return (
      <select
        className={`text-xs font-semibold px-1.5 py-0.5 rounded-sm appearance-none focus:outline-none ${bg} ${text}`}
        value={status}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="TO_DO">{formatStatus("TO_DO")}</option>
        <option value="IN_PROGRESS">{formatStatus("IN_PROGRESS")}</option>
        <option value="IN_REVIEW">{formatStatus("IN_REVIEW")}</option>
        <option value="DONE">{formatStatus("DONE")}</option>
        {/* <option value="BLOCKED">{formatStatus("BLOCKED")}</option>
        <option value="TESTING">{formatStatus("TESTING")}</option> */}
      </select>
    );
  }

  return (
    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-sm ${bg} ${text}`}>
      {displayStatus}
    </span>
  );
};

export default TaskStatus;