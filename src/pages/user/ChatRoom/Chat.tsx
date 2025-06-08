import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import ChatUserList from './ChatUserList'
import MessageArea from './MessageArea'
import { IUser } from '../../../types/users';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { disconnectSocket, getSocket, initializeSocket } from '../../../config/socket';
import { number, string } from 'yup';

interface UnreadCount {
  senderId: string;
  count: number;
}

const Chat: React.FC = () => {
    const userId = useSelector((state: RootState) => state.auth.user?._id)
    const projectId = useSelector((state: RootState) => state.project.selectedProjectId);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<{ [key: string]: boolean }>({});
    const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>({});
    const [sidebarWidth, setSidebarWidth] = useState(384);
    const chatUserListRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);


    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.error('No access token found in localStorage');
            return;
        }

        const socket = initializeSocket(token);
        if (!socket) return;

        socket.emit('register', userId)
        socket.emit('fetchUnreadCounts', projectId);

        socket.on('onlineStatus', ({ userId, isonline }: { userId: string; isonline: boolean }) => {
            setOnlineUsers((prev) => ({
                ...prev,
                [userId]: isonline,
            }));
        });


        socket.on('unreadCounts', (counts: UnreadCount[]) => {
      const countsMap = counts.reduce((acc, { senderId, count }) => {
        acc[senderId] = count;
        return acc;
      }, {} as { [key: string]: number });
      setUnreadCounts(countsMap);
    });


        socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
            if (err.message === 'Invalid token') {
                window.location.href = '/login';
            }
        });


        return () => {
            disconnectSocket()
        }
    }, [userId, projectId])



    const handleSelectUser = (user: IUser) => {
        setSelectedUser(user)
        const socket = getSocket()
        if (socket && user._id) {
            socket.emit('onlineStatus', user._id);
        }
    }


    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        isDragging.current = true;
        document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (isDragging.current && chatUserListRef.current) {
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const newWidth = clientX - chatUserListRef.current.getBoundingClientRect().left;
            if (newWidth >= 200 && newWidth <= 600) {
                setSidebarWidth(newWidth);
            }
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.body.style.userSelect = '';
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleMouseMove, { passive: false });
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, []);


    return (

        <div className="p-1.5 pt-2.5 bg-[#191919] flex min-h-[93vh] h-auto">
            <div
                ref={chatUserListRef}
                className="relative"
                style={{ width: `${sidebarWidth}px` }}
            >
                <ChatUserList
                    onSelectUser={handleSelectUser}
                    selectedUserId={selectedUser?._id || null}
                    unreadCounts={unreadCounts}
                />
                <div
                    className="absolute top-0 right-0 w-1 h-[calc(96vh-3rem)] bg-[#191919] cursor-col-resize hover:bg-[#60A5FA]"
                    onMouseDown={handleMouseDown}
                />
            </div>
            <div className="flex-1">
                {selectedUser && (
                    <MessageArea
                        userDetails={selectedUser}
                        socket={getSocket()!}
                        onlineUsers={onlineUsers}
                    />
                )}
            </div>
        </div>
    )
}

export default Chat

