import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  topOffset?: string; 
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  topOffset = 'pt-10', 
}) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-[#1919194e] flex items-start justify-center z-50 ${topOffset}`}>
      <div className="bg-[#1E1E1E] rounded-md shadow-lg p-6 max-w-md">
        {/* <div className="flex items-center gap-2 text-red-700 bg-red-500/20 p-3 rounded-full mb-4">
          <FaExclamationTriangle />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div> */}
        <div className="flex items-center gap-3 mb-4">
                    <div className='bg-red-500/20 p-3 rounded-full'>
                  <IoWarningOutline size={24} className="text-red-600/80 text-2xl" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-300">{title}</h2>
                </div>
        <p className="text-gray-400 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-1 bg-[#262626] text-gray-200 rounded hover:bg-[#333] transition"
            onClick={() => {
                console.log('ConfirmModal: Cancel button clicked'); 
                onClose();
              }}
          >
            {cancelText}
          </button>
          <button
            className="px-4 py-1 bg-red-500/50 text-white rounded hover:bg-red-700/80 transition"
            onClick={() => {
                console.log('ConfirmModal: Delete button clicked');
                onConfirm();
              }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;