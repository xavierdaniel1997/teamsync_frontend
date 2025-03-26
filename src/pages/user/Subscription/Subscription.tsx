import { Link } from "react-router-dom";
import UserPlanCard from "../../../components/user/UserPlanCard";
import { usePlanMutation } from "../../../hooks/usePlans";

const SubscriptionPricing = () => {
    const {useGetPlan} = usePlanMutation()
    const { data: plans, isLoading, isError, error } = useGetPlan;

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Discover The Plans
        </h1>
        <p className="text-gray-400 text-lg">
          Select from best plan, ensuring a perfect match. Need more or less?
          Customize your subscription for a seamless fit!
        </p>
      </div>

      <div className="flex flex-col gap-7">
        <div className="flex space-x-6 w-full max-w-5xl">
          {plans?.data?.map((data: any) => (
            <UserPlanCard data={data}/>
          ))}
        </div>
        <div className="w-full flex justify-end gap-3">
          <Link to="/create-work-space" className="text-white py-2 px-4 rounded-md bg-[#555] hover:bg-[#444] transition">
            Skip
          </Link>
          <button className="bg-[#0052CC] text-white py-2 px-4 rounded-md hover:bg-[#0047B3] transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPricing;
