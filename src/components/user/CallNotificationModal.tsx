
import React from 'react';
import { IoClose } from 'react-icons/io5';

interface CallNotificationModalProps {
  callerName: string;
  onAccept: () => void;
  onReject: () => void;
}

const CallNotificationModal: React.FC<CallNotificationModalProps> = ({ callerName, onAccept, onReject }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2E2E2E] p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-300 text-lg font-semibold">Incoming Call</h2>
          <button onClick={onReject}>
            <IoClose size={20} className="text-gray-400" />
          </button>
        </div>
        <p className="text-gray-400 mb-6">{callerName} is calling you...</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onReject}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Reject
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallNotificationModal;