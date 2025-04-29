import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

const statusOptions = {
  "To Do": {
    textColor: "text-gray-400",
    bgColor: "bg-gray-800",
    hoverBg: "hover:bg-gray-700",
  },
  "In Progress": {
    textColor: "text-blue-400",
    bgColor: "bg-blue-900",
    hoverBg: "hover:bg-blue-800",
  },
  Done: {
    textColor: "text-green-400",
    bgColor: "bg-green-900",
    hoverBg: "hover:bg-green-800",
  },
};

interface StatusDropdownProps {
  selectedStatus: string;
  onSelect: (status: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ selectedStatus, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-1 bg-[#0D0F11] py-1.5 px-3 rounded-sm cursor-pointer justify-between text-sm text-gray-200 w-32"
        onClick={() => setOpen(!open)}
      >
        <span>{selectedStatus}</span>
        <RiArrowDownSLine size={18} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 bg-[#262626] py-1 rounded shadow-sm z-50 w-32">
          {Object.entries(statusOptions).map(([status, styles]) => (
            <div
              key={status}
              onClick={() => {
                onSelect(status);
                setOpen(false);
              }}
              className="px-4 py-2 cursor-pointer transition-colors duration-150 hover:bg-[#333]"
            >
              <p className={`${styles.textColor} ${styles.bgColor} px-2 rounded-full text-center text-sm`}>
                {status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;