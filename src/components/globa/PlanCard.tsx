import React from "react";

interface PlanCardProps {
  data: any; 
}

const PlanCard: React.FC<PlanCardProps> = ({data}) => {
  return (
    <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[350px] relative bg-[#101010] p-6 rounded-md">
      <div className="">
        <h2 className="text-xl font-semibold text-white">{data?.name}</h2>
        <p className="text-[#A2D2FF] text-lg font-medium mt-2">${data.price} / month</p>
        <ul className="mt-4 space-y-2 text-gray-400 text-sm">
          <li>{data?.projectLimit} Projects</li>
          <li>{data?.memberLimit} Members</li>
          <li>Priority Support</li>
        </ul>
      </div>
    </div>
  ); 
};

export default PlanCard;

