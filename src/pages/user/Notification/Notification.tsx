import React, {useEffect, useState } from 'react'
import BreadCrumb from '../../../components/globa/BreadCrumb'
import NotificationCard from '../../../components/user/NotificationCard'
import { INotification } from '../../../types/notification'
import { initializeSocket } from '../../../config/socket'
import { useNotifications } from '../../../hooks/useNotifications'
import { RootState } from '../../../redux/store'
import { useSelector } from 'react-redux'

const Notification: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all')
  const { useGetNotifications } = useNotifications(filter)

  const { data: notificationData } = useGetNotifications;

  useEffect(() => {
    if (notificationData?.data) {
      setNotifications(notificationData?.data)
    }
  }, [notificationData])



  useEffect(() => {

    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.error('No access token found in localStorage');
      return;
    }

    const socket = initializeSocket(token);
    if (!socket) return;

     socket.emit('register', userId);


    socket.on('notification', (notification: INotification) => {
      console.log("Received notification:", notification);
      setNotifications((prev) => {
        if (prev.some((n) => n._id === notification._id)) {
          return prev;
        }
        return [notification, ...prev];
      })
    });

    return () => {
      socket.off('notification')
    }

  }, [userId])


  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'read') return notification.isRead;
    if (filter === 'unread') return !notification.isRead;
    return true;
  });


  console.log("form the notification page", notificationData)

  return (
    <div className="p-5 bg-[#191919] min-h-[93vh] flex flex-col gap-2">
      <div className='m-5'>
        <BreadCrumb
          pageName="Notifications"
          isBackLog={false}
        />
      </div>
      <div className='mx-5 flex items-center gap-2'>
        <button
        className={`px-3 py-1 rounded text-sm ${filter === 'all' ? 'bg-gray-600' : 'bg-gray-700/50 hover:bg-gray-600'}`}
          onClick={() => setFilter('all')}
          >All</button>
         <button
         className={`px-3 py-1 rounded text-sm ${filter === 'read' ? 'bg-gray-600' : 'bg-gray-700/50 hover:bg-gray-600'}`}
          onClick={() => setFilter('read')}
          >Readed</button>
          <button
          className={`px-3 py-1 rounded text-sm ${filter === 'unread' ? 'bg-gray-600' : 'bg-gray-700/50 hover:bg-gray-600'}`}
          onClick={() => setFilter('unread')}
          >UnReaded</button>
      </div>
      <div className='m-5 flex flex-col gap-4'>
        {filteredNotifications?.map((notification) => (
          <NotificationCard
          key={notification._id}
          notification={notification}
          />
        ))}

      </div>
    </div>
  )
}

export default Notification