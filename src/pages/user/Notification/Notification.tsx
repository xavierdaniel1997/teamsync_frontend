import React from 'react'
import BreadCrumb from '../../../components/globa/BreadCrumb'
import NotificationCard from '../../../components/user/NotificationCard'

const Notification: React.FC = () => {
  return (
    <div className="p-5 bg-[#191919] min-h-[93vh]">
      <div className='m-5'>
         <BreadCrumb
        pageName="Notifications"
        isBackLog={true}
      />
      </div>
      <div className='mx-10 mt-10 flex flex-col gap-5'>
        <NotificationCard
          type="error"
          title="High Priority: Website redesign deadline approaching"
          message="Project deadline is in 2 days. Please review and update your tasks."
          subtitle="Website Redesign Project"
        />
        <NotificationCard
          type="warning"
          title="New comment on your task"
          message='Sarah added a comment: "Can we schedule a quick call to discuss the navigation menu?"'
          subtitle="Navigation Menu Improvement"
        />
      </div>
      </div>
  )
}

export default Notification