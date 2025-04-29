import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

interface Epic {
  _id: string;
  title: string;
}

interface ParentDropdownProps {
  epics: Epic[];
  selectedParent: string;
  onSelect: (parentId: string) => void;
}

const ParentDropdown: React.FC<ParentDropdownProps> = ({ epics, selectedParent, onSelect }) => {
  const [open, setOpen] = useState(false);

  // Find the selected epic
  const selectedEpic = epics.find(epic => epic._id === selectedParent);

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex items-center gap-2 py-2.5 px-3 rounded-sm cursor-pointer w-full justify-between bg-[#0D0F11] text-sm text-gray-200 hover:bg-[#333] transition-colors duration-150"
        onClick={() => setOpen(!open)}
        aria-label="Select parent epic"
        role="combobox"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="truncate">{selectedEpic ? selectedEpic.title : "Select Epic"}</span>
        </div>
        <RiArrowDownSLine size={18} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 bg-[#262626] py-1 rounded shadow-sm z-50 w-full max-h-60 overflow-y-auto">
          {epics.length > 0 ? (
            epics.map(epic => (
              <div
                key={epic._id}
                className="flex items-center p-2 gap-3 cursor-pointer hover:bg-[#333] transition-colors duration-150"
                onClick={() => {
                  onSelect(epic._id);
                  setOpen(false);
                }}
                role="option"
              >
                <span className="text-sm text-gray-200 truncate">{epic.title}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400 text-sm">No epics available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentDropdown;