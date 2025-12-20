
import { useSelector } from 'react-redux'
import ProjectCard from '../../../components/user/ProjectCard'
import { RootState } from '../../../redux/store'
import { useProject } from '../../../hooks/useProject'


const MyProjects = () => {

  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId)

  // const {data, isLoading, isError} = useGetProjects(workspaceId)
  const {useGetProjects} = useProject()
  const { data, isLoading, isError } = useGetProjects(workspaceId ?? undefined);

  console.log("form the projects my project tab", data)
  return (
    <div className='p-6'>
        <h2 className="mb-8 text-xl font-medium text-[#f0f0f0]">My Projects</h2>
        <div className='flex gap-4'>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        <ProjectCard/>
        </div>
    </div>
  )
}

export default MyProjects