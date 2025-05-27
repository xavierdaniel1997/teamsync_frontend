import React, { useState } from 'react'
import ChatUserList from './ChatUserList'
import MessageArea from './MessageArea'
import { IUser } from '../../../types/users';

const Chat: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

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
               {selectedUser && <MessageArea userDetails={selectedUser}/>}
            </div>
        </div>
    </div>
  )
}

export default Chat