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
import tick from '../../../assets/tick.svg'
import doubleTick from "../../../assets/doubletick.svg"
import { useCall } from '../../../context/CallContext';

interface Message {
  _id: string;
  projectId: string;
  senderId: string;
  recipientId: string;
  message: string;
  createdAt: string;
  timestamp: string;
  read: boolean;
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


const MessageArea: React.FC<MessageAreaProps> = ({ userDetails, socket, onlineUsers}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [groupedMessages, setGroupedMessages] = useState<GroupedMessages[]>([]);
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId);
  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);
  const { useGetMessages } = useChatRoom()
  const { callActive, initiateVideoCall, endCall } = useCall();

  const { data: chatData } = useGetMessages(projectId || "", userDetails._id || "")


  useEffect(() => {
    if (chatData?.data && Array.isArray(chatData?.data))
      setGroupedMessages(chatData.data)
  }, [chatData?.data])

    const handleVideoCall = () => {
    if (callActive) {
      endCall();
    } else {
      initiateVideoCall(userDetails._id || "", userDetails.fullName);
    }
  };



  useEffect(() => {
    socket.on('receiveMessage', (message: Message) => {
      if (
        (message.senderId === userDetails._id && message.recipientId === currentUserId) ||
        (message.senderId === currentUserId && message.recipientId === userDetails._id)
      ) {
        const date = new Date(message.timestamp);
        const dateKey = format(startOfDay(date), 'yyyy-MM-dd');
        let label = format(date, 'MMMM d, yyyy');
        if (isToday(date)) {
          label = 'Today';
        } else if (isYesterday(date)) {
          label = 'Yesterday';
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
              messages: [message],
            });
          }
          return newGroups;
        });
      }

    })

    socket.on('messageRead', ({ messageId, read }: { messageId: string; read: boolean }) => {
      console.log(`messageRead event received: messageId=${messageId}, read=${read}`);
      setGroupedMessages((prev) => prev.map((group) => ({
        ...group,
        messages: group.messages.map((msg) => msg._id === messageId ? { ...msg, read } : msg)
      })))
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
      socket.off('messageRead');
      socket.off('typing');
      socket.off('stopTyping');
    }
  }, [socket, userDetails._id, currentUserId, callActive])

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [groupedMessages]);


  //  Mark messages as read when they become visible
  useEffect(() => {
    if (!messageAreaRef.current || !currentUserId || currentUserId === userDetails._id) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute('data-message-id');
            if (messageId) {
              socket.emit('markMessageAsRead', { messageId });
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the message is visible
    );

    const messageElements = messageAreaRef.current?.querySelectorAll('[data-message-id]');
    messageElements?.forEach((el) => {
      const messageId = el.getAttribute('data-message-id');
      const message = groupedMessages
        .flatMap((group) => group.messages)
        .find((msg) => msg._id === messageId);
      if (message && !message.read && message.recipientId === currentUserId) {
        observer.observe(el);
      }
    });


    return () => {
      messageElements?.forEach((el) => observer.unobserve(el));
    };
  }, [groupedMessages, socket, currentUserId, userDetails._id]);



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
          <button
            onClick={handleVideoCall}
            disabled={!isOnline && !callActive}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
              callActive 
                ? 'text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100' 
                : 'text-gray-400 hover:text-gray-200 disabled:opacity-50'
            }`}
          >
            <IoVideocam size={20} />
            {callActive && <span className="text-sm">End Call</span>}
          </button>
          <BsThreeDots size={20} />
        </div>
       
      </div>

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
                  data-message-id={msg._id}
                  className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'
                    } mb-2 px-6`}
                >
                  <div
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
                      <div className='flex flex-row items-end gap-2'>
                        <div>{msg.message}</div>
                        {msg.senderId === currentUserId && <div className=''>
                          {msg.read ? <img className='w-5 h-6' src={doubleTick} /> : <img className='w-3 h-6 rotate-12' src={tick} />}
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          ))}
          {isTyping && <div className=' w-fit'>
            <span className='bg-gray-700 pb-1 px-2 rounded-md'><DotPulse size={25} speed={2.5} /></span>
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