import React from 'react';
import BreadCrumb from '../../../components/globa/BreadCrumb';
import StatCard from '../../../components/user/StatCard';
import SprintProgress from '../../../components/user/SprintProgress';
import MyTasks from '../../../components/user/MyTasks';
import RecentActivity from '../../../components/user/RecentActivity';
import TaskStatusCard from '../../../components/user/TaskStatusCard';  

const Dashboard: React.FC = () => {
  return (
  // <div className='p-5 bg-[#191919] min-h-[93vh] h-auto'>
  //  <div className='m-5'>
  //       <BreadCrumb
  //         pageName="Dashboard"
  //         buttonText="Add Tasks"
  //         isBackLog={true}
  //       />
  //     </div>
  // </div>

      <div className="p-5 bg-[#191919] min-h-[93vh] text-white">
      <div className="m-5">
        <BreadCrumb
          pageName="Dashboard"
          buttonText="Add Tasks"
          isBackLog={true}
        />
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-3 m-5">
        <StatCard title="Total Tasks" value={24} />
        <StatCard title="In Progress" value={8} />
        <StatCard title="Completed" value={12} />
        <StatCard title="Blocked" value={4}/>
      </div>

      {/* MIDDLE SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  m-5">
        <SprintProgress />
        <TaskStatusCard />
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-5">
        <MyTasks />
        <RecentActivity />
      </div>
    </div>


  );
};

export default Dashboard;
