import React from 'react';
import { IoCheckmarkCircle, IoWarning, IoInformationCircle, IoCloseCircle, IoCheckmark, IoTrash } from 'react-icons/io5';
import { INotification, NotificationStatus } from '../../types/notification';
import { formatInTimeZone } from 'date-fns-tz';
import { useNotifications } from '../../hooks/useNotifications';
import doubleTick from '../../assets/doubletick.svg'
import singleTick from '../../assets/tick.svg'

// Define the props interface
interface NotificationCardProps {
  notification: INotification;
}

const notificationStatusTypes = [
  {
    id: NotificationStatus.INFO,
    label: "INFO",
    bgColor: "bg-green-600",
    textColor: "text-green-600/50",
    icon: <IoInformationCircle size={28} />,
  },
  {
    id: NotificationStatus.ERROR,
    label: "ERROR",
    bgColor: "bg-red-600/30",
    textColor: "text-red-100",
    icon: <IoCloseCircle size={22} />,
  },
  {
    id: NotificationStatus.WARNING,
    label: "WARNING",
    bgColor: "bg-red-600",
    textColor: "text-red-500/50",
    icon: <IoWarning size={28} />,
  },
  {
    id: NotificationStatus.SUCCESS,
    label: "SUCCESS",
    bgColor: "bg-blue-600/30",
    textColor: "text-blue-100",
    icon: <IoCloseCircle size={22} />,
  },
];

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {

  const { useUpdateNotification, useDeleteNotification } = useNotifications();

  const statusType = notificationStatusTypes.find(
    (type) => type.id === notification.notificationStatus
  ) || notificationStatusTypes[0];

  const handleMarkAsRead = (notificationId: string) => {
    if (notificationId) {
      useUpdateNotification.mutate(notificationId)
    }
  }

  const handleRemoveNotification = (notificationId: string) => {
    if(notificationId){
      useDeleteNotification.mutate(notificationId)
    }
  }

  return (
    <div
      className={`flex gap-2 items-center p-3 bg-[#202020]  rounded-r-lg shadow-md `}
    >
      <div className={`flex-shrink-0 ml-2 ${statusType.textColor}`}>
        {statusType.icon}
      </div>
      <div className="ml-3 flex-1">
        <div className='flex flex-col gap-1.5'>
          <p className="font-semibold text-gray-400">{notification.title}</p>
          <p className="text-gray-300">{notification.message}</p>
          <p className="text-xs text-blue-400 mt-1">{notification.subtitle}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className='text-xs text-gray-400'>
          {formatInTimeZone(new Date(notification.createdAt), 'Asia/Kolkata', 'MMM d, yyyy h:mm a')}
        </div>
        {notification.isRead ? <button
          className="text-gray-400 hover:text-gray-200 focus:outline-none"
          aria-label="Mark as read"

        >
          <img className='w-6 h-6' src={doubleTick} alt="" />
        </button> : <button className='cursor-pointer'
          onClick={() => handleMarkAsRead(notification._id)}>
           <IoCheckmark size={22} className="w-4 h-5" />
        </button>}
        <button
          className="text-gray-400 hover:text-gray-200 focus:outline-none cursor-pointer"
          aria-label="Delete notification"
          onClick={() => handleRemoveNotification(notification._id)}
        >
          <IoTrash size={22} className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
};

export default NotificationCard;