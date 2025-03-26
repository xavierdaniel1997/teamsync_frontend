import { TiTick } from "react-icons/ti";

interface UserPlanProps {
  name: string;
  price: number;
  projectLimit: number;
  memberLimit: number;
}

const UserPlanCard: React.FC<{data: UserPlanProps}> = ({data}) => {
  const planData = {
    name: "Basic",
    price: 0,
    projectLimit: 5,
    memberLimit: 10,
  }

  return (
    <div className="w-full sm:w-[290px] md:w-[290px] lg:w-[290px] relative bg-[#101010] p-6 rounded-md border border-[#444]">
  

      <div>
        <h2 className="text-xl font-semibold text-white">{data.name}</h2>
        <p className="text-gray-400 text-lg font-medium mt-2">
          {data.price === 0 ? "Free" : `$${data.price} / month`}
        </p>

        <ul className="mt-4 space-y-3 text-gray-400 text-sm">
          <li className="flex items-center gap-2">
            <TiTick size={20}/>
            <span>{data.projectLimit} Projects</span>
          </li>
          <li className="flex items-center gap-2">
              <TiTick size={20}/>
            <span>{data.memberLimit} Members</span>
          </li>
          <li className="flex items-center gap-2">
              <TiTick size={20}/>
            <span>Basic Support</span>
          </li>
          <li className="flex items-center gap-2">
              <TiTick size={20}/>
            <span>Support</span>
          </li>
        </ul>

        <button className="w-full mt-6 py-2.5 rounded-md font-medium bg-[#dfdfdf] text-black">Choose Plan</button>
      </div>
    </div>
  )
}

export default UserPlanCard

