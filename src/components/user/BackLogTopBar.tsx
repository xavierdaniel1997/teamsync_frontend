import { FaSearch, FaUserFriends, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { MdInsights } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';

interface Props {
    showEpic: boolean;
    setShowEpic: React.Dispatch<React.SetStateAction<boolean>>;
  }

const BackLogTopBar: React.FC<Props> = ({showEpic, setShowEpic}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 w-full">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white border border-gray-600 rounded px-3 py-1 pl-8 w-48 placeholder-gray-400 focus:outline-none"
          />
          <FaSearch className="absolute left-2 top-2.5 text-gray-400" />
        </div>

        {/* Overlapping Avatars */}
        <div className="flex items-center ml-2">
          <div className="flex -space-x-2">
            {/* First Avatar */}
            <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-[#1c1f24] z-10">
              HM
            </div>

            {/* Second Avatar */}
            <div className="bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center border-2 border-[#1c1f24] z-0">
              <FaUserCircle className="text-[#1c1f24] text-lg" />
            </div>
          </div>

          {/* Add Member Button */}
          <div className="ml-2 bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-gray-600 cursor-pointer">
            <FaUserPlus />
          </div>
        </div>

        {/* Dropdown */}
        <div className="flex items-center text-white ml-4 cursor-pointer"
        onClick={() => setShowEpic(prev => !prev)}
        >
          <span>Epic</span>
          <HiOutlineChevronDown className="ml-1" />
        </div>
      </div>

      {/* Right Side - Buttons */}
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-1 bg-[#323232c7] text-white px-3 py-1 rounded">
          <MdInsights />
          <span className="text-sm">Insights</span>
        </button>
        <button className="flex items-center space-x-1 bg-[#323232c7]  text-white px-3 py-1 rounded">
          <FiSettings />
          <span className="text-sm">View settings</span>
        </button>
      </div>
    </div>
  )
}

export default BackLogTopBar