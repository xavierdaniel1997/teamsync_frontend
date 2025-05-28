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

interface Message {
  _id: string;
  projectId: string;
  senderId: string;
  recipientId: string;
  message: string;
  createdAt: string;
  tempId?: string; // Added for matching temporary messages
}

interface MessageAreaProps {
  userDetails: IUser;
  socket: Socket;
}

const MessageArea: React.FC<MessageAreaProps> = ({ userDetails, socket }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId);
  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);


  useEffect(() => {
    const fetchMessages = async () => {
      if (projectId && currentUserId && userDetails._id) {
        setIsLoading(true);
        setError(null);
        try {
          const fetchedMessages = await getMessagesApi(projectId, userDetails._id);
          setMessages(fetchedMessages);
        } catch (err: any) {
          setError(err.message || 'Failed to load messages');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMessages();
  }, [projectId, currentUserId, userDetails._id]);


  useEffect(() => {
    if (projectId && currentUserId && userDetails._id) {
      const joinConversation = () => {
        socket.emit('joinConversation', { projectId, recipientId: userDetails._id });
      };
      joinConversation();

      socket.on('connect', () => {
        console.log('Socket reconnected, rejoining conversation');
        joinConversation();
      });

      socket.on('newMessage', (message: Message) => {
        console.log('newMessage received:', message);
        if (
          (message.senderId === currentUserId && message.recipientId === userDetails._id) ||
          (message.senderId === userDetails._id && message.recipientId === currentUserId)
        ) {
          setMessages((prev) => {
            if (prev.some((msg) => msg._id === message._id)) {
              console.log('Duplicate message ignored:', message._id);
              return prev;
            }

            if (message.tempId) {
              const tempMessageIndex = prev.findIndex((msg) => msg._id === message.tempId);
              if (tempMessageIndex !== -1) {
                console.log('Replacing temporary message:', message.tempId);
                const updatedMessages = [...prev];
                updatedMessages[tempMessageIndex] = { ...message, tempId: undefined };
                return updatedMessages;
              }
            }

            console.log('Adding new message:', message._id);
            return [...prev, message];
          });
        }
      });

      socket.on('error', ({ message }: { message: string }) => {
        console.log('Socket error:', message);
        if (message === 'Invalid token') {
          // handleTokenRefresh();
        }
      });

      if (messageAreaRef.current) {
        messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
      }

      return () => {
        socket.off('connect');
        socket.off('newMessage');
        socket.off('error');
      };
    }
  }, [socket, projectId, currentUserId, userDetails._id]);

  const handleSendMessage = () => {
    if (newMessage.trim() && projectId && userDetails._id) {
      const tempId = `temp-${Date.now()}`;
      const tempMessage: Message = {
        _id: tempId,
        projectId,
        senderId: currentUserId!,
        recipientId: userDetails._id,
        message: newMessage,
        createdAt: new Date().toISOString(),
        tempId,
      };

      console.log('Adding temporary message:', tempId);
      setMessages((prev) => [...prev, tempMessage]);
      socket.emit('sendMessage', {
        projectId,
        recipientId: userDetails._id,
        message: newMessage,
        tempId, 
      });
      setNewMessage('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      handleSendMessage();
    }
  };

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

      {/* Message Area */}
      <div
        ref={messageAreaRef}
        className="h-[692px] custom-scrollbar overflow-y-auto p-4 px-10 space-y-2"
      >
        {isLoading ? (
          <div className="w-full bg-blue-400 text-white text-center py-1.5 rounded-md">
            Loading messages...
          </div>
        ) : error ? (
          <div className="w-full bg-red-400 text-white text-center py-1.5 rounded-md">
            Failed to load messages: {error}
          </div>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`${
                msg.senderId === currentUserId ? 'text-right' : 'text-left'
              } w-full`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-md ${
                  msg.senderId === currentUserId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-200'
                }`}
              >
                {msg.message}
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-blue-400 text-white text-center py-1.5 rounded-md">
            No messages yet
          </div>
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