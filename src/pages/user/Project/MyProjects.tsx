
import { useSelector } from 'react-redux'
import ProjectCard from '../../../components/user/ProjectCard'
import { RootState } from '../../../redux/store'
import { useProject } from '../../../hooks/useProject'
import { IProject } from '../../../types/project'
import { CiViewTable } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { useState } from 'react'
import ReusableTableTypeOne from '../../../components/globa/ReusableTableTypeOne'
import { formatDate } from '../../../utils/formatDate'

 const columns = [
    { label: "Project Name", field: "name" },
    { label: "Title", field: "title" },
    {label: "Created Date", field: "createdAt"},
    {label: "Owner", field: "owner"},
  ];

const MyProjects = () => {

  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId)

  const {useGetProjects} = useProject()
  const [showGrid, setShowGrid] = useState<boolean>(false)
  const [showTable, setShowTable] = useState<boolean>(true)
  const { data, isLoading, isError } = useGetProjects(workspaceId ?? undefined);

  console.log("form the projects my project tab", data)

  const toggleGrid = () => {
    setShowGrid(true);
    setShowTable(false)
  }

  const toggleTable = () => {
    setShowTable(true);
    setShowGrid(false)
  }

  const projectTableData = data?.data.map((project: IProject) => ({
    name:  <div className='flex items-center gap-3'>
      <img src={project.projectCoverImg} alt="project cover image" className='w-16 h-8 rounded-xs object-cover'/>
      <p>{project.name}</p>
    </div>
    ,
    title: project.title,
    createdAt: formatDate(project.createdAt),
    owner: project.owner.fullName,
  }))

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center'>
        <h2 className="mb-8 text-xl font-medium text-[#f0f0f0]">My Projects</h2>
        <div className='flex items-center gap-2 text-gray-400'>
          <CiGrid41  className='cursor-pointer' size={18} onClick={toggleGrid}/>
          <CiViewTable  className='cursor-pointer' size={18} onClick={toggleTable}/>
        </div>
        </div>
        {showGrid && <div className='flex gap-4'>
          {data?.data.map((project: IProject) => (
        <ProjectCard projectCoverImg={project.projectCoverImg} title={project.title} owner={project.owner} name={project.name}/>
          ))}
        </div>}

        {showTable && <div>
          <ReusableTableTypeOne columns={columns} data={projectTableData ?? []} />
        </div>}
    </div>
  )
}

export default MyProjects