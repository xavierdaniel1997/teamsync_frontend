import React, { useEffect, useRef, useState } from 'react';
import { IUser } from '../../../types/users';
import UserAvatar from '../../../components/globa/UserAvatar';
import { getInitials, getRandomColor } from '../../../utils/userHelpers';
import { BsEmojiSmile, BsThreeDots } from 'react-icons/bs';
import { MdAttachFile } from 'react-icons/md';
import { IoSend, IoVideocam } from 'react-icons/io5';
import { Socket } from 'socket.io-client';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import NoMessagesAnimation from '../../../components/user/NoMessagesAnimation';
import { format, isToday, isYesterday, startOfDay } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { useChatRoom } from '../../../hooks/useChatRoom';
import { DotPulse } from "ldrs/react";

interface Message {
  _id: string;
  projectId: string;
  senderId: string;
  recipientId: string;
  message: string;
  createdAt: string;
  timestamp: string;
}

interface GroupedMessages {
  date: string;
  label: string;
  messages: Message[];
}

interface MessageAreaProps {
  userDetails: IUser;
  socket: Socket;
  onlineUsers: { [key: string]: boolean }
}

const MessageArea: React.FC<MessageAreaProps> = ({ userDetails, socket, onlineUsers }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [groupedMessages, setGroupedMessages] = useState<GroupedMessages[]>([]);
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId);
  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);
  const { useGetMessages } = useChatRoom()

  const { data: chatData } = useGetMessages(projectId || "", userDetails._id || "")

  console.log("chatData form the message area", chatData)

  useEffect(() => {
    if (chatData?.data && Array.isArray(chatData?.data))
      // setMessages(chatData?.data)
      setGroupedMessages(chatData.data)
  }, [chatData?.data])


  useEffect(() => {
    socket.on('receiveMessage', (message: Message) => {
      // setMessages((preMessage) => [...preMessage, message]) 
      const date = new Date(message.timestamp);
      const dateKey = format(startOfDay(date), 'yyyy-MM-dd');
      let label = format(date, 'MMMM d, yyyy');
      if (isToday(date)) {
        label = 'Today';
      } else if (isYesterday(date)) {
        label = 'Yesterday'
      }

      setGroupedMessages((prev) => {
        const newGroups = [...prev];
        const groupIndex = newGroups.findIndex((group) => group.date === dateKey);

        if (groupIndex >= 0) {
          newGroups[groupIndex].messages = [...newGroups[groupIndex].messages, message].sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        } else {
          newGroups.unshift({
            date: dateKey,
            label,
            messages: [message]
          })
        }
        return newGroups
      })
    })

    socket.on('typing', ({ senderId }: { senderId: string }) => {
      if (senderId === userDetails._id) {
        setIsTyping(true);
      }
    });

    // Listen for stopTyping events
    socket.on('stopTyping', ({ senderId }: { senderId: string }) => {
      if (senderId === userDetails._id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off('receiveMessage')
      socket.off('typing');
      socket.off('stopTyping');
    }
  }, [socket, userDetails._id])

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [groupedMessages]);


  useEffect(() => {
    if (!newMessage.trim() || !projectId || !userDetails._id || !currentUserId) {
      return;
    }

    socket.emit('typing', {
      senderId: currentUserId,
      recipientId: userDetails._id,
    });

    const typingTimeout = setTimeout(() => {
      socket.emit('stopTyping', {
        senderId: currentUserId,
        recipientId: userDetails._id,
      });
    }, 5000);

    return () => clearTimeout(typingTimeout);
  }, [newMessage, socket, projectId, userDetails._id, currentUserId]);



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
    socket.emit('stopTyping', {
      senderId: currentUserId,
      recipientId: userDetails._id,
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
    <div className="flex-1 w-full bg-[#202020] flex flex-col ">
      {/* Header Section */}


      <div className='px-4 py-3 border-b border-[#2E2E2E] flex justify-between items-center'>
        <div className="flex items-center">
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
                <div className="flex items-center gap-1">
                  <span>Online</span>
                  <div className='h-2 w-2 rounded-full bg-green-500'></div>
                  {isTyping && (
                    <p className="text-gray-400 text-xs animate-pulse ml-2">
                      {userDetails.fullName} is typing...
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>offline</span>
                </div>
              )}
            </p>

          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div>
            <IoVideocam size={20} />
          </div>
          <div>
            <BsThreeDots size={20} />
          </div>
        </div>
      </div>


      {/* message area */}


      {groupedMessages.length === 0 ? (
        <div className="flex flex-col items-center h-[calc(96vh-3rem)] justify-center text-white text-center rounded-md">
          <NoMessagesAnimation />
        </div>
      ) : (
        <div
          ref={messageAreaRef}
          className="h-[76vh] custom-scrollbar overflow-y-auto p-4 px-10 space-y-2 "
        >
          {groupedMessages.map((group) => (
            <div key={group.date}>
              <div className="date-header text-center text-gray-400 text-sm my-2">
                <span className="bg-[#2E2E2E] px-3 py-1 rounded-full">{group.label}</span>
              </div>

              {group.messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
                    } mb-2 px-6`}
                >
                  <div
                    // className={`flex items-center gap-2 ${msg.senderId === currentUserId ? 'flex-row' : 'flex-row-reverse'
                    //   }relative group`}
                    className={`flex items-center gap-2 ${msg.senderId === currentUserId ? 'flex-row' : 'flex-row-reverse'
                      } relative group`}
                  >
                    <div
                      className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {formatInTimeZone(new Date(msg.timestamp), 'Asia/Kolkata', 'h:mm a')}
                    </div>
                    <div
                      className={`max-w-[100%] px-3 py-1.5 rounded-lg text-justify ${msg.senderId === currentUserId
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-200'
                        }`}
                    >
                      <div>{msg.message}</div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          ))}
          {isTyping && <div className=' w-fit'>
            <span className='bg-gray-700 pb-1 px-2 rounded-md'><DotPulse size={25} speed={2.5}/></span>
          </div>}
        </div>
      )}


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