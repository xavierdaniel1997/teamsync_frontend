import { FaSearch, FaUserPlus } from 'react-icons/fa';
import { HiOutlineChevronDown} from 'react-icons/hi';
import { MdInsights } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import UserAvatar from '../globa/UserAvatar';
import { getInitials, getRandomColor } from '../../utils/userHelpers';
import { IUser } from '../../types/users';
import { useState } from 'react';
import InviteTeamModal from './InviteTeamModal';
import { useProject } from '../../hooks/useProject';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

interface Props {
    showEpic: boolean;
    setShowEpic: React.Dispatch<React.SetStateAction<boolean>>;
    projectMembers?: any[]
    selectedUserIds?: string[];
  handleSelectUser: (userId: string, user: IUser) => void;
  }

const BackLogTopBar: React.FC<Props> = ({ setShowEpic, projectMembers, selectedUserIds, handleSelectUser}) => {

  const [openInviteModal, setOpenInviteModal] = useState(false)
    const { useInviteMember} = useProject()
    const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId)
    const project = useSelector((state: RootState) => state.project.selectedProject)
  const isSelected = (userId: string) => selectedUserIds?.includes(userId);
  
      const handleInviteMembers = (emails: string[]) => {
      if (!project?._id || !workspaceId) {
        toast.error("Project ID or Workspace ID is missing");
        return;
      }
      useInviteMember.mutate({
        projectId: project._id,
        workspaceId,
        emails
      }
      )
      setOpenInviteModal(false)
    };
 
  return (
    <div className="flex items-center justify-between px-4 py-2 w-full">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white border border-gray-600 rounded px-3 py-1 pl-8 w-48 placeholder-gray-400 focus:outline-none"
          />
          <FaSearch className="absolute left-2 top-2.5 text-gray-400" />
        </div>

        {/* Overlapping Avatars */}
        <div className="flex items-center ml-2">
          <div className="flex -space-x-2 ">
            {projectMembers?.map((member) => (
              <button className='cursor-pointer' key={member._id} onClick={() => handleSelectUser(member.user._id, member)}>
              <UserAvatar
               user={member.user || undefined} 
               getRandomColor={getRandomColor}
                getInitials={getInitials} 
                selectedUser={isSelected(member.user._id)}/>
              </button>
            ))}
           
          </div>

          {/* Add Member Button */}
          <div className="ml-2 bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-gray-600 cursor-pointer"
          onClick={() => setOpenInviteModal(!openInviteModal)}>
            <FaUserPlus />
          </div>
        </div>

        {/* Dropdown */}
        <div className="flex items-center text-white ml-4 cursor-pointer"
        onClick={() => setShowEpic(prev => !prev)}
        >
          <span>Epic</span>
          <HiOutlineChevronDown className="ml-1" />
        </div>
      </div>

      {/* Right Side - Buttons */}
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-1 bg-[#323232c7] text-white px-3 py-1 rounded">
          <MdInsights />
          <span className="text-sm">Insights</span>
        </button>
        <button className="flex items-center space-x-1 bg-[#323232c7]  text-white px-3 py-1 rounded">
          <FiSettings />
          <span className="text-sm">View settings</span>
        </button>
      </div>
        <InviteTeamModal isOpen={openInviteModal} onClose={() => setOpenInviteModal(false)}
          onInvite={handleInviteMembers}
        />
    </div>
  )
}

export default BackLogTopBar