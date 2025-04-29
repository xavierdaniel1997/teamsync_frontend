import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { getInitials, getRandomColor } from "../../utils/userHelpers";
import UserAvatar from "../globa/UserAvatar";

interface ReporterDropdownProps {
  members: { user: { _id: string; fullName: string; secondName: string; avatar?: string }; accessLevel: string }[];
  selectedReporter: string; // Changed to string
  onSelect: (reporterId: string) => void; // Changed to string
}

const ReporterDropdown: React.FC<ReporterDropdownProps> = ({ members, selectedReporter, onSelect }) => {
  const [open, setOpen] = useState(false);

  // Filter members with accessLevel: "OWNER"
  const owners = members.filter(member => member.accessLevel === "OWNER");

  // Find the selected reporter
  const selectedUser = owners.find(owner => owner.user._id === selectedReporter)?.user;

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex items-center gap-2 py-2.5 px-3 rounded-sm cursor-pointer w-full justify-between bg-[#0D0F11] text-sm text-gray-200"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          {selectedUser ? (
            <>
              <UserAvatar
                user={selectedUser}
                getRandomColor={getRandomColor}
                getInitials={getInitials}
                width={6}
                height={6}
              />
              <span>{`${selectedUser.fullName} ${selectedUser.secondName || ''}`.trim()}</span>
            </>
          ) : (
            <span>Select Reporter</span>
          )}
        </div>
        <RiArrowDownSLine size={18} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 bg-[#262626] py-1 rounded shadow-sm z-50 w-full max-h-60 overflow-y-auto">
          {owners.length > 0 ? (
            owners.map(owner => (
              <div
                key={owner.user._id}
                className="flex items-center p-2 gap-3 cursor-pointer hover:bg-[#333] transition-colors duration-150"
                onClick={() => {
                  onSelect(owner.user._id);
                  setOpen(false);
                }}
              >
                <UserAvatar
                  user={owner.user}
                  getRandomColor={getRandomColor}
                  getInitials={getInitials}
                  width={6}
                  height={6}
                />
                <span className="text-sm text-gray-200">
                  {`${owner.user.fullName} ${owner.user.secondName || ''}`.trim()}
                </span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400 text-sm">No owners available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReporterDropdown;