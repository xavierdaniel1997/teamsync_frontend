import React from 'react'
import BreadCrumb from '../../../components/globa/BreadCrumb'
import { FiPlus, FiUserPlus } from "react-icons/fi"; 
import PlanCard from '../../../components/globa/PlanCard';

const Plan: React.FC = () => {

  return (
    <div className='min-h-screen'>
      <div>
        <BreadCrumb 
        pageName="Plans"
        buttonText="Add Plan"
        onButtonClick={() => alert("Button Clicked!")}
        ButtonIcon={FiPlus} 
         />
      </div>
      <div className='mt-6 flex flex-wrap gap-6 justify-center'>
        <PlanCard/>
        <PlanCard/>
        <PlanCard/>
      </div>

      
    </div>
  )
}

export default Plan