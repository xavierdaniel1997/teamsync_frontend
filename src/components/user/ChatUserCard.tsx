

import React from 'react';
import { IUser } from '../../types/users';
import UserAvatar from '../globa/UserAvatar';
import { getInitials, getRandomColor } from '../../utils/userHelpers';

interface ChatUserCardProps {
  user: IUser;
  isSelected: boolean;
  onSelect: () => void;
}

const ChatUserCard: React.FC<ChatUserCardProps> = ({ user, isSelected, onSelect }) => {
  if (!user) {
    return null;
  }

  return (
    <div
      className={`w-full p-4 flex items-center gap-4 rounded-sm cursor-pointer hover:bg-[#2E2E2E] transition-all duration-100 ${
        isSelected ? 'bg-[#1919197a] border-b border-[#2E2E2E]' : 'bg-[#191919]'
      }`}
      onClick={onSelect}
      role="button"
      aria-label={`Chat with ${user.fullName}`}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === 'Space' ? onSelect() : null)}
    >
      <div>
        <UserAvatar
          user={user}
          getRandomColor={getRandomColor}
          getInitials={getInitials}
          width={10}
          height={10}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-gray-300 font-semibold">
          {user.secondName ? `${user.fullName} ${user.secondName}` : user.fullName}
        </h1>
        <p className="text-gray-500 text-xs capitalize">last seen</p>
      </div>
    </div>
  );
};

export default React.memo(ChatUserCard);