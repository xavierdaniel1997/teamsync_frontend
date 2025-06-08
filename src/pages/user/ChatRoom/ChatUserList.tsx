import React from 'react';
import { LuChevronsLeft } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useChatRoom } from '../../../hooks/useChatRoom';
import ChatUserCard from '../../../components/user/ChatUserCard';
import { IUser } from '../../../types/users';
import { Socket } from 'socket.io-client';
import { number, string } from 'yup';

interface Member {
  user: IUser;
  accessLevel: string;
  _id: string;
}

interface MemberListData {
  _id: string;
  owner: string;
  members: Member[];
}

interface ChatUserListProps {
  onSelectUser: (user: IUser) => void;
  selectedUserId: string | null;
  unreadCounts: { [key: string]: number };
}

const ChatUserList: React.FC<ChatUserListProps> = ({ onSelectUser, selectedUserId, unreadCounts}) => {
  const { useGetMemeberList } = useChatRoom();
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId);
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId);
  const currentUser = useSelector((state: RootState) => state.auth.user?._id);

  const { data: userDetails, isLoading, error } = useGetMemeberList(workspaceId || '', projectId || '');

  if (isLoading) {
    return (
      <div className="text-white min-h-screen flex flex-col bg-[#202020] justify-center items-center">
        <p>Loading members...</p>
      </div>
    );
  }

  if (error || !userDetails) {
    return (
      <div className="text-white min-h-screen flex flex-col bg-[#202020] justify-center items-center">
        <p>Error loading members: {error ? (error as Error).message : 'No data available'}</p>
      </div>
    );
  }

  if (!workspaceId || !projectId) {
    return (
      <div className="text-white min-h-screen flex flex-col bg-[#202020] justify-center items-center">
        <p>Please select a workspace and project.</p>
      </div>
    );
  }

  const filteredMembers = userDetails.data.members.filter(
    (member: Member) => member.user._id !== currentUser
  );



  return (
    <div 
    className="text-white flex flex-col bg-[#202020] h-[calc(98vh-4rem)]"
    >
      <div className="p-4 flex justify-between items-center border-b border-[#2E2E2E]">
        <h1 className="text-gray-300 font-semibold text-2xl">Chats</h1>
        <span className='cursor-grabbing'
        >
          <LuChevronsLeft size={20} aria-label="Collapse chat list" 
          />
        </span>
      </div>
      <div className="p-2 flex flex-col gap-1 custom-scrollbar overflow-y-auto">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member: Member) => (
            <ChatUserCard
              key={member._id}
              user={member.user}
              isSelected={member.user._id === selectedUserId}
              onSelect={() => onSelectUser(member.user)}
              // unreadCount={unreadCounts[member.user._id] || 0}
              unreadCount={member.user._id ? unreadCounts[member.user._id] : 0}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center">No other members found.</p>
        )}
      </div>
    </div>
  );
};

export default ChatUserList;