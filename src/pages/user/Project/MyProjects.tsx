
import ProjectCard from '../../../components/user/ProjectCard'

const MyProjects = () => {
  return (
    <div className='p-6'>
        <h2 className="mb-8 text-xl font-medium text-[#f0f0f0]">My Projects</h2>
        <div className='flex gap-4'>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        {/* <ProjectCard/> */}
        </div>
    </div>
  )
}

export default MyProjects