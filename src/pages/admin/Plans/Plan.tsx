import React, { useState } from 'react';
import BreadCrumb from '../../../components/globa/BreadCrumb';
import { FiPlus } from 'react-icons/fi';
import PlanCard from '../../../components/globa/PlanCard';
import PlanDialog from '../../../components/admin/PlanDialog';
import { usePlanMutation } from '../../../hooks/usePlans';
import Loader from '../../../components/globa/Loader';

const Plan: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { useGetPlan } = usePlanMutation()

  const { data: plans, isLoading, isError, error } = useGetPlan;


  return (
    <div className="min-h-screen">
      <div>
        <BreadCrumb
          pageName="Plans"
          buttonText="Add Plan"
          onButtonClick={() => setOpen(true)}
          ButtonIcon={FiPlus}
        />
      </div>


      {isLoading ? (
        <div className="mt-8 flex justify-center items-center min-h-[200px]">
          <p>Loading...</p>
        </div>
      ) : isError ? (
        <div className="mt-8 pl-8 text-center text-red-500">
          Error fetching plans: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      ) : (
        <div className="mt-8 pl-8 flex flex-wrap gap-6 justify-center">
          {plans?.data?.length > 0 ? (
            plans.data.map((data: any) => (
              <PlanCard key={data._id} data={data} />
            ))
          ) : (
            <div>No plans available.</div>
          )}
        </div>
      )}



      <PlanDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Plan;
