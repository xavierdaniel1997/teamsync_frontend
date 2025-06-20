import React from "react";
import { IUser } from "../../types/users";

// interface User {
//   _id?: string;
//   fullName?: string;
//   secondName?: string;
//   avatar?: string;
// }

interface UserAvatarProps {
  user?: IUser;
  getRandomColor: (id: string) => string;
  getInitials: (fullName: string, secondName: string) => string;
  width?: number;
  height?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, getRandomColor, getInitials, width=8, height=8 }) => {
  if (user && user.fullName) {
    if (user.avatar) {
      return (
        <img
          src={user?.avatar}
          alt="User avatar"
          className={`w-${width} h-${height} object-cover rounded-full`}
        />
      );
    } else {
      return (
        <div
          className={`w-${width} h-${height} rounded-full flex items-center justify-center text-white font-semibold text-xs`}
          style={{ backgroundColor: getRandomColor(user._id || "") }}
        >
          {getInitials(user.fullName, user.secondName || "")}
        </div>
      );
    }
  }

  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm bg-gray-500">
      ?
    </div>
  );
};

export default UserAvatar;
