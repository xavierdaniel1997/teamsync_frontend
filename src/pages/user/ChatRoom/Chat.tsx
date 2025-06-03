import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import ChatUserList from './ChatUserList'
import MessageArea from './MessageArea'
import { IUser } from '../../../types/users';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { disconnectSocket, getSocket, initializeSocket } from '../../../config/socket';

const Chat: React.FC = () => {
    const userId = useSelector((state: RootState) => state.auth.user?._id)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<{ [key: string]: boolean }>({});
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

        socket.on('onlineStatus', ({ userId, isonline }: { userId: string; isonline: boolean }) => {
            setOnlineUsers((prev) => ({
                ...prev,
                [userId]: isonline,
            }));
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
    }, [userId])



    const handleSelectUser = (user: IUser) => {
        setSelectedUser(user)
        const socket = getSocket()
        if (socket && user._id) {
            socket.emit('onlineStatus', user._id);
        }
    }


    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current && chatUserListRef.current) {
            const newWidth = e.clientX - chatUserListRef.current.getBoundingClientRect().left;
            if (newWidth >= 200 && newWidth <= 600) { // Min 200px, Max 600px
                setSidebarWidth(newWidth);
            }
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    console.log("checking online user", onlineUsers)

    return (

        <div className="p-2.5 pb-2.5 bg-[#191919] flex">
            <div
                ref={chatUserListRef}
                className="relative"
                style={{ width: `${sidebarWidth}px` }}
            >
                <ChatUserList
                    onSelectUser={handleSelectUser}
                    selectedUserId={selectedUser?._id || null}
                    handleMouseDown={handleMouseDown}
                />
                <div
                    className="absolute top-0 right-0 w-1 h-[calc(96vh-3rem)] bg-[#2a2a2a] cursor-ew-resize hover:bg-[#3e3e3e]"
                    onMouseDown={handleMouseDown}
                />
            </div>
            <div className="flex-1 h-[calc(100vh-1.25rem)]">
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


















// <div className='min-h-11/12 max-h-screen p-2.5 pb-2.5 bg-[#191919]'>
//     <div className='flex w-full gap-2'>
//         <div className='w-lg'>
//             <ChatUserList
//                 onSelectUser={handleSelectUser}
//                 selectedUserId={selectedUser?._id || null}
//             />
//         </div>
//         <div className='flex-1 h-full'>
//             {selectedUser && <MessageArea
//                 userDetails={selectedUser}
//                 socket={getSocket()!}
//                 onlineUsers={onlineUsers}
//             />}
//         </div>
//     </div>
// </div>