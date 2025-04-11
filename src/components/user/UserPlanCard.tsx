import { TiTick } from "react-icons/ti";

interface UserPlanProps {
  _id: string;
  name: string;
  price: number;
  projectLimit: number;
  memberLimit: number;
}

interface UserPlanCardProps {
  data: UserPlanProps;
  isSelected: boolean;
  onSelectPlan: () => void;
  isCurrentPlan?: boolean;
  currentPlanPrice: string;
}

const UserPlanCard: React.FC<UserPlanCardProps> = ({ data, isSelected, onSelectPlan, isCurrentPlan, currentPlanPrice }) => {
  return (
    <div
      className={`w-64 relative p-6 rounded-md border 
      transition cursor-pointer ${
        isSelected ? "border-[#0052CC] bg-[#002e6e63]" : "border-[#444] bg-[#101010]"
      }`}
      onClick={onSelectPlan}
    >
      <h2 className="text-xl font-semibold text-white">{data.name}</h2>
      <p className="text-gray-400 text-lg font-medium mt-2">
        {data.price === 0 ? "Free" : `$${data.price} / month`}
      </p>

      <ul className="mt-4 space-y-3 text-gray-400 text-sm">
        <li className="flex items-center gap-2">
          <TiTick size={20} />
          <span>{data.projectLimit} Projects</span>
        </li>
        <li className="flex items-center gap-2">
          <TiTick size={20} />
          <span>{data.memberLimit} Members</span>
        </li>
        <li className="flex items-center gap-2">
          <TiTick size={20} />
          <span>Basic Support</span>
        </li>
        <li className="flex items-center gap-2">
          <TiTick size={20} />
          <span>Support</span>
        </li>
      </ul>

      <button
        className={`w-full mt-6 py-1.5 rounded-md font-medium transition  ${isCurrentPlan ? "text-black bg-white" : "text-gray-200 bg-[#0052CC]"}`}
        onClick={onSelectPlan}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan? "Current Plan" : isSelected ? "Selected" : "Get Start"}
      </button>
    </div>
  );
};

export default UserPlanCard;
