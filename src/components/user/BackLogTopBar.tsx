import { FaSearch, FaUserPlus } from 'react-icons/fa';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi'; 
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
  handleSelectedEpic: (epicId: string) => void
  epicHeading?: { _id: string; title: string; taskKey?: number }[];
  isKanban?: boolean;
}

const BackLogTopBar: React.FC<Props> = ({ setShowEpic, projectMembers, selectedUserIds, handleSelectUser, epicHeading, handleSelectedEpic, isKanban}) => {

  const [openInviteModal, setOpenInviteModal] = useState(false)
  const [openEpics, setOpenEpics] = useState(false)
  const { useInviteMember } = useProject()
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

  const epicSelecterHandler = (epicId: string) => {
    handleSelectedEpic(epicId);
  }
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
                  selectedUser={isSelected(member.user._id)} />
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
        <div className="flex items-center text-white ml-4 cursor-pointer relative">
          <div className='flex items-center' onClick={() => {setOpenEpics(!openEpics)}}>
          <span>Epic</span>
          {openEpics ? <HiOutlineChevronUp className="ml-1" /> : <HiOutlineChevronDown className="ml-1" />}
          </div>
          {openEpics && <div className='absolute top-8 w-64 bg-[#202020] p-2 rounded-xs'>
            {epicHeading?.map((epic) => (
              <div className={`flex items-center gap-4 p-2 text-gray-300 hover:bg-[#2E2E2E]`} key={epic._id} onClick={() => epicSelecterHandler(epic._id)}>
                <div className={`w-4 h-4 ${project?.color.class} rounded-sm`} />
                <p>{epic.title}</p>
              </div>
            ))}
            <button className={`mt-1 p-1 w-full text-center text-gray-300 rounded-xs ${project?.color.class}/50 hover:${project?.color.class}`}
              onClick={() => {setShowEpic(prev => !prev); setOpenEpics(false)}}>Show epic blocks</button>
          </div>}
        </div>
      </div>

      {/* Right Side - Buttons */}
      <div className="flex items-center space-x-2">
        {!isKanban && <button className="flex items-center space-x-1 bg-[#323232c7] text-white px-3 py-1 rounded">
          <MdInsights />
          <span className="text-sm">Insights</span>
        </button>}
        {isKanban ? (<button className="flex items-center space-x-1 bg-blue-600/80 hover:bg-blue-500  text-gray-300 px-3 py-1 rounded">
          {/* <FiSettings /> */}
        Complete sprint
        </button>) : 
        (<button className="flex items-center space-x-1 bg-[#323232c7]  text-white px-3 py-1 rounded">
          <FiSettings />
          <span className="text-sm">View settings</span>
        </button>)}
        
      </div>
      <InviteTeamModal isOpen={openInviteModal} onClose={() => setOpenInviteModal(false)}
        onInvite={handleInviteMembers}
      />
    </div>
  )
}

export default BackLogTopBar