// components/GlobalCallNotification.tsx
import React from 'react';
import { IoCall, IoClose, IoVideocam } from 'react-icons/io5';
import { useCall } from '../../context/CallContext';

const GlobalCallNotification: React.FC = () => {
  const { incomingCall, acceptCall, rejectCall } = useCall();

  if (!incomingCall) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9998]">
      <div className="bg-gradient-to-br from-[#2E2E2E] to-[#1A1A1A] p-8 rounded-xl shadow-2xl w-96 border border-gray-600">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <IoVideocam size={32} className="text-white" />
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Incoming Video Call</h2>
          <p className="text-gray-300 text-lg">{incomingCall.callerName}</p>
          <p className="text-gray-500 text-sm mt-1">is calling you...</p>
        </div>


        {/* Action buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={rejectCall}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="Reject call"
          >
            <IoClose size={28} />
          </button>
          <button
            onClick={acceptCall}
            className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg animate-pulse"
            aria-label="Accept call"
          >
            <IoCall size={24} />
          </button>
        </div>

        {/* Quick actions text */}
        <div className="flex justify-between mt-4 text-xs text-gray-400">
          <span>Decline</span>
          <span>Accept</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalCallNotification;