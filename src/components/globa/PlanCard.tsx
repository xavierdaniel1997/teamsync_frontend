import React from "react";

const PlanCard: React.FC = () => {
  return (
    <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[380px] border border-[#0084FF] relative bg-[#1E2222] p-6 rounded-md">
      <div className="">
        <h2 className="text-xl font-semibold text-white">Pro</h2>
        <p className="text-[#A2D2FF] text-lg font-medium mt-2">$19.99 / month</p>
        <ul className="mt-4 space-y-2 text-gray-400 text-sm">
          <li>Unlimited Projects</li>
          <li>50GB Storage</li>
          <li>Priority Support</li>
        </ul>
      </div>
    </div>
  ); 
};

export default PlanCard;


// border border-[#0084FF] text-gray-200 p-6 rounded-xl shadow-lg transition-all duration-300 shadow-[#0084FF]/40 hover:shadow-[#0084FF]/50 hover:-translate-y-2