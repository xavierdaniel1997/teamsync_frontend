import { FiLink, FiSettings } from 'react-icons/fi'
import { FaRegStar, FaRegClock } from 'react-icons/fa'
import { IUser } from '../../types/users';
import UserAvatar from '../globa/UserAvatar';
import { getInitials, getRandomColor } from '../../utils/userHelpers';

interface ProjectCardProps{
  projectCoverImg: string;
  title: string;
  owner: IUser;
  name: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({projectCoverImg, title, owner, name}) => {
 

  const backgroundUrl =
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'

  return (
    <div className="bg-[#1e1e1e] text-white rounded-lg overflow-hidden shadow-lg ">
      <div
        className="relative h-40 bg-cover bg-center"
        // style={{ backgroundImage: `url(${backgroundUrl})` }}
         style={{
    backgroundImage: projectCoverImg
      ? `url(${projectCoverImg})`
      : `url(${backgroundUrl})`,
  }}
      >
        <div 
        // className="absolute inset-0 bg-black/40"
        className='w-full sm:w-[250px] md:w-[250px] lg:w-[260px] bg-[#1e1e1e] text-white rounded-lg overflow-hidden shadow-lg flex flex-col'
         />

        <div className="absolute top-2 left-2 flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center shadow-md">
            <FaRegClock size={18} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-xs text-gray-50">{title}</p>
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

      <div className="px-4 py-3 text-sm text-gray-300">{title}</div>

      <div className="flex items-center justify-between px-4 pb-3">
        <UserAvatar user={owner} getRandomColor={getRandomColor} getInitials={getInitials} height={6} width={6}/>
        <button className="text-gray-400 hover:text-white">
          <FiSettings size={18} />
        </button>
      </div>
    </div>
  )
}

export default ProjectCard
