import {useState } from "react";


interface StatusBadgeProps {
  status: string;
  isEditable?: boolean;
  onChange?: (newStatus: string) => void;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  isEditable = false,
  onChange,
  className = "",
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const statusStyles = {
    "TO DO": { backgroundColor: "#0052CC", color: "#FFFFFF" },
    "IN PROGRESS": { backgroundColor: "#00C4B4", color: "#FFFFFF" },
    "DONE": { backgroundColor: "#00875A", color: "#FFFFFF" },
    "REVIEW": { backgroundColor: "#FFAB00", color: "#000000" },
    default: { backgroundColor: "#CCCCCC", color: "#000000" },
  };

  const style = statusStyles[status as keyof typeof statusStyles] || statusStyles.default;

  if (isEditable && onChange) {
    return (
      <div
        className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm text-xs font-semibold ${className}`} 
        style={style}
      >
        <select
          value={currentStatus}
          onChange={(e) => {
            const newStatus = e.target.value;
            setCurrentStatus(newStatus);
            if (onChange) onChange(newStatus);
          }}
          className="bg-transparent text-inherit border-none outline-none appearance-none text-center" 
          style={{ color: "inherit", width: "fit-content" }} 
        >
          <option value="TO DO" style={{ backgroundColor: "#0052CC", color: "#FFFFFF" }}>
            TO DO
          </option>
          <option
            value="IN PROGRESS"
            style={{ backgroundColor: "#00C4B4", color: "#FFFFFF" }}
          >
            IN PROGRESS
          </option>
          <option value="DONE" style={{ backgroundColor: "#00875A", color: "#FFFFFF" }}>
            DONE
          </option>
          <option value="REVIEW" style={{ backgroundColor: "#FFAB00", color: "#000000" }}>
            REVIEW
          </option>
        </select>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-sm text-xs font-semibold ${className}`} 
      style={style}
    >
      {status}
    </div>
  );
};

export default StatusBadge;