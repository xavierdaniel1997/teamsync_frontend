

import React from 'react';
import { IUser } from '../../types/users';
import UserAvatar from '../globa/UserAvatar';
import { getInitials, getRandomColor } from '../../utils/userHelpers';
import { Message } from '../../types/chat';
import { formatInTimeZone } from 'date-fns-tz';

interface ChatUserCardProps {
  user: IUser;
  isSelected: boolean;
  onSelect: () => void;
  unreadCount: number;
  lastMessage: Message | null;
}

const ChatUserCard: React.FC<ChatUserCardProps> = ({ user, isSelected, onSelect, unreadCount, lastMessage }) => {
  if (!user) {
    return null;
  }

  const truncateMessage = (message: string, maxLength: number = 20) => {
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };


  return (
    <div
      className={`w-full p-4 flex justify-between items-center gap-4 rounded-sm cursor-pointer hover:bg-[#2E2E2E] transition-all duration-100 ${isSelected ? 'bg-[#1919197a] border-b border-[#2E2E2E]' : 'bg-[#191919]'
        }`}
      onClick={onSelect}
      role="button"
      aria-label={`Chat with ${user.fullName}`}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === 'Space' ? onSelect() : null)}
    >
      <div className='flex items-center gap-4'>
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
          <p className="text-gray-500 text-xs capitalize">
            {lastMessage ? truncateMessage(lastMessage.message) : 'No messages yet'}
          </p>
        </div>
      </div>

      {/* show if there is any unreaded messages */}
      <div className='flex flex-col justify-end gap-1'>
        <span className='text-xs text-gray-400'>
          {lastMessage ? formatInTimeZone(new Date(lastMessage.timestamp), 'Asia/Kolkata', 'h:mm a') : ""}
        </span>
        <div className='flex justify-end'>
          {unreadCount > 0 && <span className='bg-blue-500 px-1.5 rounded-full text-[#191919] font-bold w-fit'>
            {unreadCount}
          </span>}
        </div>
      </div>
    </div>
  );
};

// export default React.memo(ChatUserCard);
export default ChatUserCard;