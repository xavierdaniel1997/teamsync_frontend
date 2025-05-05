import React from 'react'
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import ReusableTableTypeOne from '../../../components/globa/ReusableTableTypeOne';
import { formatDate } from '../../../utils/formatDate';

const InvitedMembers: React.FC = () => {
    const project = useSelector((state: RootState) => state.project.selectedProject)
    const user = useSelector((state: RootState) => state.auth.user)
  
    const currentUserId = user?._id;
    const currentMember = project?.members.find(
      (member: any) => member.user._id === currentUserId
    );
    const hasEditAccess = currentMember?.accessLevel === "OWNER" || currentMember?.accessLevel === "WRITE";
  
    console.log("project details from the invited members", project)
  
    const columns = [
      { label: "Email", field: "email" },
      { label: "Access Level", field: "accessLevel" },
      { label: "Status", field: "status" },
      {label: "Invited At", field: "createdAt"},
      {label: "Expires At", field: "expiresAt"},
    ];

    // const invitedData = project?.invitations.map((invitation: any) => ({
    //     email: invitation?.email,
    //     accessLevel: invitation?.accessLevel,
    //     status: (<div className={``}>
    //         {invitation?.status}
    //     </div>),
    //     createdAt: formatDate(invitation?.createdAt),
    //     expiresAt: formatDate(invitation?.expiresAt)
    // }))

    const invitedData = project?.invitations.map((invitation: any) => {
        const accessLevelStyles = {
            OWNER: 'bg-yellow-500/30 text-yellow-900',
            WRITE: 'bg-blue-500/30 text-blue-900',
            READ: 'bg-gray-200/10 text-gray-300',
            NONE: 'bg-gray-200/30 text-gray-800',
          };
          const statusStyles = {
            PENDING: 'bg-orange-300/10 text-orange-600',
            ACCEPTED: 'bg-green-500/30 text-green-900',
            REJECTED: 'bg-red-500/30 text-red-900',
            EXPIRED: 'bg-gray-500/30 text-gray-900',
          };
    
        return {
          email: invitation?.email,
          accessLevel: (
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                accessLevelStyles[invitation?.accessLevel as keyof typeof accessLevelStyles] ||
                'bg-gray-200 text-gray-800'
              }`}
            >
              {invitation?.accessLevel}
            </span>
          ),
          status: (
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                statusStyles[invitation?.status as keyof typeof statusStyles] ||
                'bg-gray-200 text-gray-800'
              }`}
            >
              {invitation?.status}
            </span>
          ),
          createdAt: formatDate(invitation?.createdAt),
          expiresAt: formatDate(invitation?.expiresAt),
        };
      });


  return (
     <div className='p-6'>
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-xl font-medium text-[#f0f0f0]">Invited Members</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-9 pr-3 text-sm bg-[#1e1e1e] border border-[#333] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 h-8"
                  />
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-sm rounded-sm transition-colors">
                  Add member
                </button>
              </div>
            </div>
    
            <ReusableTableTypeOne columns={columns} data={invitedData || []} />
          </div>
  )
}

export default InvitedMembers