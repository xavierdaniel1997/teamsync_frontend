import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { getInitials, getRandomColor } from "../../utils/userHelpers";
import UserAvatar from "../globa/UserAvatar";

interface AssigneeDropdownProps {
  members: { user: { _id: string; fullName: string; secondName: string } }[];
  selectedAssignee: string;
  onSelect: (assigneeId: string) => void;
}

const AssigneeDropdown: React.FC<AssigneeDropdownProps> = ({ members, selectedAssignee, onSelect }) => {
  const [open, setOpen] = useState(false);

  const selectedUser = members.find((member) => member.user._id === selectedAssignee)?.user;

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
                width={6}  height={6}
              />
              <span>
                {selectedUser.fullName} {selectedUser.secondName}
              </span>
            </>
          ) : (
            <span>Select Assignee</span>
          )}
        </div>
        <RiArrowDownSLine size={18} />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 bg-[#262626] py-1 rounded shadow-sm z-50 w-full max-h-60 overflow-y-auto">
          {members.length > 0 ? (
            members.map((member) => (
              <div
                key={member.user._id}
                className="flex items-center p-2 gap-3 cursor-pointer hover:bg-[#333] transition-colors duration-150"
                onClick={() => {
                  onSelect(member.user._id);
                  setOpen(false);
                }}
              >
                <UserAvatar
                  user={member.user}
                  getRandomColor={getRandomColor}
                  getInitials={getInitials}
                />
                <span className="text-sm text-gray-200">
                  {member.user.fullName} {member.user.secondName}
                </span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400 text-sm">No members available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssigneeDropdown;