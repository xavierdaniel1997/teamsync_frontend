

import React from 'react';
import UserAvatar from '../globa/UserAvatar';
import { getInitials, getRandomColor } from '../../utils/userHelpers';
import { formatInTimeZone } from 'date-fns-tz';
import { useCall } from '../../context/CallContext';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

interface MeetingLinkCardProps {
  schedule?: boolean;
  meeting: any;
}

const MeetingLinkCard: React.FC<MeetingLinkCardProps> = ({ schedule, meeting }) => {
  const { joinGroupMeeting, startGroupMeeting } = useCall();
  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);

  const handleJoinMeeting = () => {
    if (meeting.status === 'ongoing') {
      joinGroupMeeting(meeting.meetingId, meeting.roomId, meeting.participants, currentUserId);
    } else {
      alert('Meeting is not ongoing.');
    }
  };

  const handleStartMeeting = () => {
    if (meeting.status === 'scheduled') {
      const participantIds = meeting.participants.map((p: any) => p.userId._id || p.userId);
      startGroupMeeting(meeting.meetingId, meeting.roomId, participantIds);
    } else {
      alert('Meeting cannot be started.');
    }
  };

  return (
    <div className={`${schedule ? "bg-[rgb(32,32,32)] text-gray-400 rounded-lg p-4" : "bg-[rgb(32,32,32)] text-gray-400 rounded-lg p-4 flex-1"}  `}>
      <div className="flex flex-col gap-2">
        <>

          {schedule ? <div className='flex items-center gap-2'>
              <UserAvatar user={meeting?.creatorId || undefined} getRandomColor={getRandomColor}  getInitials={getInitials}/>
              <div>
                <h1>Hosted By {meeting?.creatorId.fullName}</h1>
            </div>
          </div> : <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828a4 4 0 00-5.656-5.656L7 9.172v6.586l6.586-6.586a2 2 0 112.828 2.828L9.828 18H15.172a4 4 0 005.656-5.656L15.172 7z"
            />
          </svg>}
        </>
        <div className="flex justify-between items-center">
          <div className='flex flex-col gap-3'>
            <p className="font-semibold">{schedule ? meeting?.meetingTitle : "Meeting with Daniel Xavier"}</p>
            <p className="text-sm text-gray-400">{formatInTimeZone(new Date(meeting?.createdAt), 'Asia/Kolkata', 'MMM d, yyyy h:mm a')}</p>
          </div>
          <div className='flex items-center gap-3 w-auto'>
            <p>Join at {formatInTimeZone(new Date(meeting?.scheduledDate), 'Asia/Kolkata', 'MMM d, yyyy h:mm a')}</p>
            <div className='flex -space-x-2'>
              {meeting?.participants?.map((member: any) => (
                <UserAvatar key={member._id} user={member?.userId || undefined} getRandomColor={getRandomColor}  getInitials={getInitials}/>
              ))}
            </div>
            

            {meeting.status === 'scheduled' && meeting.creatorId._id === currentUserId ? (
              <button
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-md w-20"
                onClick={handleStartMeeting}
              >
                Start
              </button>
            ) : meeting.status === 'ongoing' || meeting.status !== "ended"? (
              <button
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded-md w-20"
                onClick={handleJoinMeeting}
              >
                Join
              </button>
            ) : (
              <button
                className="bg-gray-700 text-white px-4 py-1 rounded-md w-20 opacity-50 cursor-not-allowed"
                disabled
              >
                Ended
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingLinkCard;