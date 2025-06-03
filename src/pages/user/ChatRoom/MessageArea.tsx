import React, { useEffect, useRef, useState } from 'react';
import { IUser } from '../../../types/users';
import UserAvatar from '../../../components/globa/UserAvatar';
import { getInitials, getRandomColor } from '../../../utils/userHelpers';
import { BsEmojiSmile } from 'react-icons/bs';
import { MdAttachFile } from 'react-icons/md';
import { IoSend } from 'react-icons/io5';
import { Socket } from 'socket.io-client';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import NoMessagesAnimation from '../../../components/user/NoMessagesAnimation';
import { useProject } from '../../../hooks/useProject';
import { useChatRoom } from '../../../hooks/useChatRoom';

interface Message {
  _id: string;
  projectId: string;
  senderId: string;
  recipientId: string;
  message: string;
  createdAt: string;
}

interface MessageAreaProps {
  userDetails: IUser;
  socket: Socket;
  onlineUsers: { [key: string]: boolean }
}

const MessageArea: React.FC<MessageAreaProps> = ({ userDetails, socket, onlineUsers }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId);
  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);
  const { useGetMessages } = useChatRoom()

  const { data: chatData } = useGetMessages(projectId || "", userDetails._id || "")

  console.log("chatData form the message area", chatData)

  useEffect(() => {
    if (chatData?.data && Array.isArray(chatData?.data))
      setMessages(chatData?.data)
  }, [chatData?.data])


  useEffect(() => {
    socket.on('receiveMessage', (message: Message) => {
      setMessages((preMessage) => [...preMessage, message])
    })

    return () => {
      socket.off('receiveMessage')
    }
  }, [socket])



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handlesendMessage = () => {
    if (!newMessage.trim() || !projectId || !userDetails._id) {
      console.log("Missing field")
      return
    }
    socket.emit("sendMessage", {
      projectId,
      recipientId: userDetails._id,
      message: newMessage,
    });
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      handlesendMessage()
    }
  };

  const isOnline = onlineUsers[userDetails._id!] || false;

  return (
    <div className="flex-1 w-full bg-[#202020] flex flex-col h-[calc(96vh-3rem)]">
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

      
          <p className="text-gray-500 text-xs capitalize">
            {isOnline ? (
              <span className="text-green-500">Online</span>
            ) : (
              <span className="text-red-500">Offline</span>
            )}
          </p>
        </div>
      </div>


      {messages.length === 0 ? (
      
          <div className="flex flex-col items-center h-[calc(96vh-3rem)] justify-center text-white text-center rounded-md">
            <NoMessagesAnimation />
          </div>
 
      ) :
        (
          <div
          ref={messageAreaRef}
        className="custom-scrollbar overflow-y-auto p-4 px-10 space-y-2 "
          >
          {messages.map((msg) => (
            <div key={msg._id}
              className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
                } mb-2 px-6`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${msg.senderId === currentUserId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-200'
                  }`}
              >{msg.message}</div>
            </div>
          ))}
          </div>
        )}
         {/* </div> */}

      {/* Input Field Fixed at Bottom */}
      <div className="p-4 px-14">
        <div className="flex items-center bg-[#3A3A3A] rounded-lg p-2">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-transparent text-gray-200 text-sm sm:text-base placeholder-gray-500 focus:outline-none"
            value={newMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <div className="flex items-center space-x-2 ml-2">
            <button className="text-gray-400 hover:text-gray-200">
              <BsEmojiSmile className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button className="text-gray-400 hover:text-gray-200">
              <MdAttachFile className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              className="text-gray-400 hover:text-gray-200"
            >
              <IoSend className="w-5 h-5 sm:w-6 sm:h-6"
                onClick={handlesendMessage} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;