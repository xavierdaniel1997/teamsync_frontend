import React from 'react';
import { IoCheckmarkCircle, IoWarning, IoInformationCircle, IoCloseCircle, IoCheckmark, IoTrash } from 'react-icons/io5';

// Define the props interface
interface NotificationCardProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  subtitle: string;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
  className?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ type, title, message, subtitle, onMarkAsRead, onDelete, className }) => {
  // Define styles based on notification type
  const typeStyles = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    warning: 'border-l-yellow-500',
    info: 'border-l-blue-500',
  };


  return (
    <div
      className={`flex items-start p-3 bg-gray-800 border-l-4 rounded-r-lg shadow-md text-gray-300 ${typeStyles[type]} ${className}`}
      role="alert"
    >
      <div className="flex-shrink-0">
        <IoWarning size={22}/>
      </div>
      <div className="ml-3 flex-1">
        <div className='flex flex-col gap-1.5'>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-300">{message}</p>
        <p className="text-xs text-blue-400 mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
          <button
            onClick={onMarkAsRead}
            className="text-gray-400 hover:text-gray-200 focus:outline-none"
            aria-label="Mark as read"
          >
            <IoCheckmark size={22} className="w-4 h-4" />
          </button>

          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-gray-200 focus:outline-none"
            aria-label="Delete notification"
          >
            <IoTrash size={22} className="w-4 h-4" />
          </button>
    
      </div>
    </div>
  );
};

export default NotificationCard;