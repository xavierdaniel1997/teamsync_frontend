import React, { useState } from 'react';
import { IoLinkOutline } from 'react-icons/io5';
import { MdOutlineDateRange } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import { PiHashDuotone } from 'react-icons/pi';
import CreateMeetingForm from './CreateMeetingForm';
import MeetingLinkCard from '../../../components/user/MeetingLinkCard';
import { useMeeting } from '../../../hooks/useMeeting';

const Meeting: React.FC = () => {
  const [openMeetingForm, setOpenMeetingForm] = useState<boolean>(false);
  const [openMeetingLink, setOpenMeetingLink] = useState<boolean>(false);
  const [openJoinMeeting, setOpenJoinMeeting] = useState<boolean>(false);
  const [filterMeeting, setFilterMeeting] = useState("latest")
  const { useGetMyMeetings } = useMeeting();

  const handleCloseForm = () => {
    setOpenMeetingForm(false);
  };

  const handleOpenMeetingForm = () => {
    setOpenMeetingForm(true);
    setOpenJoinMeeting(false);
    setOpenMeetingLink(false);
  };

  const handleCreateMeetingLink = () => {
    setOpenMeetingLink(!openMeetingLink);
    setOpenJoinMeeting(false);
  };

  const handleJoinMeeting = () => {
    setOpenJoinMeeting(!openJoinMeeting);
    setOpenMeetingLink(false);
  };


  const { data: meetingData } = useGetMyMeetings(filterMeeting);

  console.log('form the meeting jsx', filterMeeting);

  return (
    <div className="w-full bg-[#191919] min-h-[93vh] flex flex-col gap-4 text-gray-400 p-4 sm:p-6">
      {!openMeetingForm ? (
        <div className="max-w-5xl mx-auto mt-8 w-full flex flex-col gap-5">
          {/* Meeting Actions */}
          <div className="w-full">
            <h1 className="font-semibold text-xl sm:text-2xl text-gray-300 mb-5">Meet</h1>
            <div className="flex flex-col flex-wrap sm:flex-row gap-4 w-full relative">
              <div className="flex-1 relative">
                <button
                  className="flex-1 text-base sm:text-lg hover:bg-[#0052cc57] bg-zinc-800 px-4 py-2 sm:px-5 sm:py-3 rounded-md flex items-center justify-center gap-2 sm:gap-3 transition-colors w-full"
                  onClick={handleCreateMeetingLink}
                >
                  <IoLinkOutline className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer" />
                  <span>Create a meeting link</span>
                </button>
                {openMeetingLink && (
                  <div className="absolute bg-zinc-800 flex flex-col top-14 p-3 gap-3 w-full left-0 z-10">
                    <div className="flex justify-between">
                      <p>Give your meeting a title</p>
                      <span className="cursor-pointer" onClick={handleCreateMeetingLink}>
                        <IoCloseOutline size={20} />
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Meeting title"
                      className="p-2 rounded-sm border focus:bg-[#131313] focus:border border-[#3a3a3a] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button className="bg-blue-500 p-2 rounded-sm text-white font-semibold">
                      Create
                    </button>
                  </div>
                )}
              </div>

              <button
                className="flex-1 text-base sm:text-lg hover:bg-[#0052cc57] bg-zinc-800 px-4 py-2 sm:px-5 sm:py-3 rounded-md flex items-center justify-center gap-2 sm:gap-3 transition-colors"
                onClick={handleOpenMeetingForm}
              >
                <MdOutlineDateRange className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Schedule a meeting</span>
              </button>

              <div className="flex-1 relative">
                <button
                  className="flex-1 text-base sm:text-lg hover:bg-[#0052cc57] bg-zinc-800 px-4 py-2 sm:px-5 sm:py-3 rounded-md flex items-center justify-center gap-2 sm:gap-3 transition-colors w-full"
                  onClick={handleJoinMeeting}
                >
                  <PiHashDuotone className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Join with a meeting ID</span>
                </button>
                {openJoinMeeting && (
                  <div className="absolute bg-zinc-800 flex flex-col top-14 p-3 gap-3 w-full left-0 z-10">
                    <div className="flex justify-between">
                      <p>Join a meeting with an ID</p>
                      <span className="cursor-pointer" onClick={handleJoinMeeting}>
                        <IoCloseOutline size={20} />
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter the meeting ID"
                      className="p-2 rounded-sm border focus:bg-[#131313] focus:border border-[#3a3a3a] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button className="bg-blue-500 p-2 rounded-sm text-white font-semibold">
                      Join
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <h2 className="font-semibold text-lg sm:text-xl text-gray-300 mb-5">Meeting Links</h2>
            <div className="flex flex-row flex-wrap gap-4">
              {/* <MeetingLinkCard />
              <MeetingLinkCard />
              <MeetingLinkCard /> */}
            </div>
          </div>

          <div className="w-full">
            <div className='flex justify-between'>
            <h2 className="font-semibold text-lg sm:text-xl text-gray-300 mb-5">Scheduled Meetings</h2>
            <button className='cursor-pointer' 
            // onClick={() => setFilterMeeting("old")}
            onClick={() => setFilterMeeting(filterMeeting === 'latest' ? 'old' : 'latest')}
            >
             {filterMeeting === 'latest' ? 'View old' : 'View latest'}
              </button>
            </div>
            <div className='flex flex-col gap-4'>
            {meetingData?.data?.map((meeting: any) => (
            <MeetingLinkCard key={meeting._id} meeting={meeting} schedule={true} />
            ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto mt-8 w-full flex flex-col gap-5">
          <CreateMeetingForm isOpen={openMeetingForm} onClose={handleCloseForm} />
        </div>
      )}
    </div>
  );
};

export default Meeting;