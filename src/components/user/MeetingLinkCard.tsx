/*

import React from 'react';

interface MeetingLinkCardPrope{
    schedule?: boolean
}

const MeetingLinkCard: React.FC<MeetingLinkCardPrope> = ({schedule}) => {
  return (
    <div className="bg-[#202020]  text-gray-400 rounded-lg p-4 min-w-80 max-w-lg">
      <div className="flex flex-col gap-2 space-x-3">
        <div>
            <svg
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
          </svg>
        </div>
        <div className='flex justify-between items-cente'>
        <div>
          <p className="font-semibold">{schedule? "Kick off meeting": "Meeting with Daniel Xavier"}</p>
          <p className="text-sm text-gray-400">Created 12 hours ago</p>

        </div>
        <div>
            <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded-md">
          Join
        </button>
        </div>
        </div>
      </div>
     
    </div>
  );
};

export default MeetingLinkCard;

*/


import React from 'react';

interface MeetingLinkCardProps {
  schedule?: boolean;
}

const MeetingLinkCard: React.FC<MeetingLinkCardProps> = ({ schedule }) => {
  return (
    <div className="bg-[#202020] text-gray-400 rounded-lg p-4 flex-1 min-w-[250px] max-w-[320px]">
      <div className="flex flex-col gap-2">
        <div>
          <svg
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
          </svg>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{schedule ? "Kick off meeting" : "Meeting with Daniel Xavier"}</p>
            <p className="text-sm text-gray-400">Created 12 hours ago</p>
          </div>
          <div>
            <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded-md w-full">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingLinkCard;