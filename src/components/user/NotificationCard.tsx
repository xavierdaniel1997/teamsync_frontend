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

  // Define icon colors based on type
  const iconColors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  // Map notification type to corresponding icon
  const icons = {
    success: <IoCheckmarkCircle className={`w-4 h-4 ${iconColors.success}`} />,
    error: <IoCloseCircle className={`w-4 h-4 ${iconColors.error}`} />,
    warning: <IoWarning className={`w-4 h-4 ${iconColors.warning}`} />,
    info: <IoInformationCircle className={`w-4 h-4 ${iconColors.info}`} />,
  };

  return (
    <div
      className={`flex items-start p-3 bg-gray-800 border-l-4 rounded-r-lg shadow-md text-white ${typeStyles[type]} ${className}`}
      role="alert"
    >
      <div className="flex-shrink-0 mt-1">{icons[type]}</div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-300">{message}</p>
        <p className="text-xs text-blue-400 mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center space-x-2">
        {onMarkAsRead && (
          <button
            onClick={onMarkAsRead}
            className="text-gray-400 hover:text-gray-200 focus:outline-none"
            aria-label="Mark as read"
          >
            <IoCheckmark className="w-4 h-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-gray-200 focus:outline-none"
            aria-label="Delete notification"
          >
            <IoTrash className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;