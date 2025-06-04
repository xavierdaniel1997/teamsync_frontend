import React from 'react';
import BreadCrumb from '../../../components/globa/BreadCrumb';

const Dashboard: React.FC = () => {
  return (
  <div className='p-5 bg-[#191919] min-h-[93vh] h-auto'>
   <div className='m-5'>
        <BreadCrumb
          pageName="Dashboard"
          buttonText="Add Tasks"
          isBackLog={true}
        />
      </div>
  </div>
  );
};

export default Dashboard;
