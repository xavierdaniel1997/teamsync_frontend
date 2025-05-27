import React from 'react';
import { IUser } from '../../../types/users';
import UserAvatar from '../../../components/globa/UserAvatar';
import { getInitials, getRandomColor } from '../../../utils/userHelpers';
import { BsEmojiSmile } from 'react-icons/bs'; // Emoji icon
import { MdAttachFile } from 'react-icons/md'; // Attachment icon
import { IoSend } from 'react-icons/io5'; // Send icon

interface MessageAreaProps {
  userDetails: IUser;
}

const MessageArea: React.FC<MessageAreaProps> = ({ userDetails }) => {
  return (
    <div className="flex-1 w-full bg-[#202020] flex flex-col">
  {/* Header Section */}
  <div className="px-4 py-3 border-b border-[#2E2E2E] flex items-center">
    <UserAvatar
      user={userDetails}
      getRandomColor={getRandomColor}
      getInitials={getInitials}
      width={10}
      height={10}
    />
    <div className="flex flex-col ml-2">
      <h1 className="text-gray-300 font-semibold">
        {userDetails.secondName
          ? `${userDetails.fullName} ${userDetails.secondName}`
          : userDetails.fullName}
      </h1>
      <p className="text-gray-500 text-xs capitalize">last seen</p>
    </div>
  </div>

  
  {/* here i need to make a fixed hight and with after that show scrollbar */}
<div className="h-[692px] custom-scrollbar overflow-y-auto p-4 px-10 space-y-2">
    {/* This will be shown even if there are no messages */}
    <div className="w-full bg-blue-400 text-white text-center py-1.5 rounded-md">
      No messages yet
    </div>
    <div className="w-full bg-blue-400 text-white text-center py-1.5 rounded-md">
      No messages yet
    </div>
  </div>

  {/* Input Field Fixed at Bottom */}
  <div className="p-4 px-14">
    <div className="flex items-center bg-[#3A3A3A] rounded-lg p-2">
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 bg-transparent text-gray-200 text-sm sm:text-base placeholder-gray-500 focus:outline-none"
      />
      <div className="flex items-center space-x-2 ml-2">
        <button className="text-gray-400 hover:text-gray-200">
          <BsEmojiSmile className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button className="text-gray-400 hover:text-gray-200">
          <MdAttachFile className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button className="text-gray-400 hover:text-gray-200">
          <IoSend className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default MessageArea;