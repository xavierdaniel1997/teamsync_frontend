import { FiLink, FiSettings } from 'react-icons/fi'
import { FaRegStar, FaRegClock } from 'react-icons/fa'

const ProjectCard = () => {
  // Static data
  const title = 'TeamSync'
  const category = 'TEAMS'
  const description = 'A project managment software'

  const backgroundUrl =
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
  const avatarUrl =
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80'

  return (
    <div className="bg-[#1e1e1e] text-white rounded-lg overflow-hidden shadow-lg ">
      <div
        className="relative h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute top-2 left-2 flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center shadow-md">
            <FaRegClock size={18} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-white">{title}</p>
            <p className="text-xs text-gray-300 uppercase">{category}</p>
          </div>
        </div>

        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="p-1 rounded-full bg-white/10 hover:bg-white/20">
            <FiLink size={16} />
          </button>
          <button className="p-1 rounded-full bg-white/10 hover:bg-white/20">
            <FaRegStar size={16} />
          </button>
        </div>
      </div>

      <div className="px-4 py-3 text-sm text-gray-300">{description}</div>

      <div className="flex items-center justify-between px-4 pb-3">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-6 h-6 rounded-full object-cover"
        />
        <button className="text-gray-400 hover:text-white">
          <FiSettings size={18} />
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
