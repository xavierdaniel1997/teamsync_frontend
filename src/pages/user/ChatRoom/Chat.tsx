import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import ChatUserList from './ChatUserList'
import MessageArea from './MessageArea'
import { IUser } from '../../../types/users';

const Chat: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null)


    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.error('No access token found in localStorage');
            return;
        }
        const socketInstance = io('http://localhost:5000/', {
            withCredentials: true,
            auth: { token }
        })
        
        socketInstance.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
            if (err.message === 'Invalid token') {
                window.location.href = '/login';
            }
        });
        
        setSocket(socketInstance)

        return () => {
            socketInstance.disconnect()
        }
    }, [])


    const handleSelectUser = (user: IUser) => {
        setSelectedUser(user)
    }

    console.log("selecteduser", selectedUser)

    return (
        <div className='p-2 pb-2.5 bg-[#191919]'>
            <div className='flex w-full gap-2'>
                <div className='w-full flex-1'>
                    <ChatUserList
                        onSelectUser={handleSelectUser}
                        selectedUserId={selectedUser?._id || null}
                    />
                </div>
                <div className='w-full flex-2/5'>
                    {selectedUser && socket && <MessageArea userDetails={selectedUser} socket={socket}/>}
                </div>
            </div>
        </div>
    )
}

export default Chat