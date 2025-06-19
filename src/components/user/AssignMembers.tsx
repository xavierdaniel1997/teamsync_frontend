import React from "react";
import { FiSearch } from "react-icons/fi";
import UserAvatar from "../globa/UserAvatar";
import { getInitials, getRandomColor } from "../../utils/userHelpers";
import { FaUserCircle } from "react-icons/fa";

interface AssignMemberProps {
    members: any[]
    onSelectMember: (userId: string | null) => void;
}

const AssignMembers: React.FC<AssignMemberProps> = ({ members, onSelectMember }) => {
    return (
        <div className="bg-[#202020] border-[#2C2C2C] px-3 py-2 border rounded-xs max-h-80 overflow-auto pr-1.5 custom-scrollbar">
            <div className="relative mb-2">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <FiSearch size={16} />
                </span>
                <input
                    type="text"
                    placeholder="Search members..."
                    className="bg-[#2A2A2A] text-sm text-white rounded px-9 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />

            </div>
            {members?.map((member) => (
                <div className="py-1 flex gap-2 items-center cursor-pointer"
                    onClick={() => onSelectMember(member.user._id)}>
                    <div className="flex-shrink-0">

                        <UserAvatar user={member.user || undefined} getRandomColor={getRandomColor} getInitials={getInitials} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm text-white truncate">{member.user.fullName}</p>
                        <p className="text-xs text-gray-400 truncate">{member.user.email}</p>
                    </div>
                </div>
            ))}
            <div
                className="flex items-center gap-3 mt-0.5 px-1 py-2 hover:bg-[#2E2E2E] cursor-pointer border-b border-[#2C2C2C]"
                onClick={() => onSelectMember(null)}
            >
                <span>
                    <FaUserCircle size={25} />
                </span>
                <p className="text-sm text-gray-200">Unassigne Member</p>
            </div>
        </div>
    );
};

export default AssignMembers;
