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
import { getMessagesApi } from '../../../services/chatRoomService';
import NoMessagesAnimation from '../../../components/user/NoMessagesAnimation';
import { v4 as uuidv4 } from 'uuid'; // For generating tempId

interface Message {
  _id: string;
  projectId: string;
  senderId: string;
  recipientId: string;
  message: string;
  createdAt: string;
  tempId?: string;
}

interface MessageAreaProps {
  userDetails: IUser;
  socket: Socket;
  onlineUsers: { [key: string]: boolean };
}

const MessageArea: React.FC<MessageAreaProps> = ({ userDetails, socket, onlineUsers }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId);
  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);

  // Fetch chat history when component mounts or projectId/userDetails changes
  useEffect(() => {
    if (!projectId || !userDetails._id) return;

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const fetchedMessages = await getMessagesApi(projectId, userDetails._id);
        setMessages(fetchedMessages);
      } catch (err) {
        setError('Failed to load messages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [projectId, userDetails._id]);

  // Set up Socket.IO listeners
  useEffect(() => {
    // Listen for new messages
    socket.on('newMessage', (message: Message) => {
      setMessages((prev) => [...prev, { ...message, createdAt: new Date(message.createdAt).toISOString() }]);
    });

    // Listen for message sent confirmation
    socket.on('messageSent', (message: Message) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === message.tempId ? { ...message, createdAt: new Date(message.createdAt).toISOString() } : msg
        )
      );
    });

    // Listen for errors
    socket.on('error', ({ message }: { message: string }) => {
      setError(message);
    });

    // Clean up listeners on unmount
    return () => {
      socket.off('newMessage');
      socket.off('messageSent');
      socket.off('error');
    };
  }, [socket]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !projectId || !userDetails._id || !currentUserId) {
      setError('Missing required fields');
      return;
    }

    const tempId = uuidv4(); // Generate temporary ID for optimistic update
    const tempMessage: Message = {
      _id: tempId,
      projectId,
      senderId: currentUserId,
      recipientId: userDetails._id,
      message: newMessage,
      createdAt: new Date().toISOString(),
      tempId,
    };

    // Add message to UI optimistically
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage('');

    // Emit message to server
    socket.emit('sendMessage', {
      projectId,
      recipientId: userDetails._id,
      message: newMessage,
      tempId, // Include tempId for mapping server response
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      handleSendMessage();
    }
  };

  const isOnline = onlineUsers[userDetails._id!] || false;

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
          <p className="text-gray-500 text-xs capitalize">
            {isOnline ? (
              <span className="text-green-500">Online</span>
            ) : (
              <span className="text-red-500">Offline</span>
            )}
          </p>
        </div>
      </div>

      {/* Message Area */}
      <div
        ref={messageAreaRef}
        className="h-[692px] custom-scrollbar overflow-y-auto p-4 px-10 space-y-2"
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : messages.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-white text-center rounded-md">
            <NoMessagesAnimation />
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.tempId || msg._id}
              className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs sm:max-w-md p-3 rounded-lg ${
                  msg.senderId === currentUserId ? 'bg-blue-600 text-white' : 'bg-[#3A3A3A] text-gray-200'
                }`}
              >
                <p>{msg.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

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
              onClick={handleSendMessage}
            >
              <IoSend className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;