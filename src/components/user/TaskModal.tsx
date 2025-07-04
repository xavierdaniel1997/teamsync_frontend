import { Dialog, DialogContent } from '@mui/material';
import { IoAdd, IoClose } from 'react-icons/io5';
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";
import { BsLink45Deg } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbSubtask } from "react-icons/tb";
import { BiSolidCheckboxMinus } from 'react-icons/bi';
import { FaPaperclip } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import AttachmentPreview from './AttachmentPreview';
import { IUser } from '../../types/users';
import AssignMembers from './AssignMembers';
import UserAvatar from '../globa/UserAvatar';
import { getInitials, getRandomColor } from '../../utils/userHelpers';
import OpenWebLinkModal from './OpenWebLinkModal';
import ChildIssueModal from './ChildIssueModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toast } from 'sonner';
import { useProject } from '../../hooks/useProject';
import { ITask } from '../../types/task';
import { formatInTimeZone } from 'date-fns-tz';
import { format } from 'date-fns';
import EpicListModal from './EpicListModal';
import WebLinkPreview from './WebLinkPreview';

// Define interfaces for type safety
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  epicId?: string;
  epicTitle?: string;
  taskCount?: number;
  reporter?: any;
  // members?: string[];
  members?: { user: IUser; accessLevel: string; _id: string }[];
  parentTask?: string;
  isTask: boolean;
  assignedMember?: IUser | undefined | null;
  taskId?: string;
  task: ITask;
}

interface FormValues {
  taskTitle: string;
  status: string;
  description: string;
  // url: string;
  // linkText: string;
  // parent: string;
  // assignee: string;
  startDate: string;
  endDate: string
}

// Validation schema using Yup
const validationSchema = Yup.object({
  taskTitle: Yup.string().required('Task title is required'),
  description: Yup.string().optional(),
  url: Yup.string().url('Must be a valid URL').optional(),
  linkText: Yup.string().optional(),
});

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, epicTitle, taskCount, members, parentTask, isTask, assignedMember, reporter, taskId, task }) => {

  const { useUpdateTask, useGetEpic } = useProject()
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId)
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId)
  const { data: epicData } = useGetEpic(projectId || "")

  const [openAddItem, setOpenAddItem] = useState(false);
  const [openWebLink, setOpenWebLink] = useState(false);
  const [openChildIssue, setOpenChildIssue] = useState(false);
  const [openDetailsContainer, setOpenDetailsContainer] = useState(true)
  const [assigneMember, setAssigneMember] = useState<IUser | null>(assignedMember || null)
  const [reportMember, setReportMember] = useState<IUser | null>(reporter || null)
  const [epicTask, setEpicTask] = useState<string | null>(parentTask || null)
  const [selectedEpicId, setSelectedEpicId] = useState<string | null>(null)
  const [isOpenAssigne, setIsOpenAssigne] = useState<boolean>(false)
  const [isOpenReporter, setIsOpenReporter] = useState<boolean>(false)
  const [openEpicModal, setOpenEpicModal] = useState<boolean>(false)
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [webLinks, setWebLinks] = useState<{ url: string; linkText: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);


  const initialValues: FormValues = {
    taskTitle: epicTitle || '',
    status: task.status || '',
    description: task?.description || '',
    startDate: task?.startDate ? format(new Date(task.startDate), 'yyyy-MM-dd') : '',
    endDate: task?.endDate ? format(new Date(task.endDate), 'yyyy-MM-dd') : '',
  };



  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };


  const handleOpenWebLink = () => {
    setOpenWebLink(true)
    setOpenAddItem(false)
  }

  const handleOpenChildIssue = () => {
    setOpenChildIssue(true)
    setOpenAddItem(false)
  }


  const handleSelectAssigneMember = (userId: string | null) => {
    const selectedMember = members?.find((member) => member.user._id === userId);
    if (selectedMember) {
      setAssigneMember(selectedMember.user);
    }
    setIsOpenAssigne(false);
  };


  const reportingMembers = members?.filter((member: any) => member?.accessLevel === "OWNER" || member?.accessLevel === "WRITE")
  const handleSelectReportMember = (userId: string | null) => {
    const selectedMember = reportingMembers?.find((member) => member.user._id === userId);
    if (selectedMember) {
      setReportMember(selectedMember.user);
    }
    setIsOpenAssigne(false);
  };

  const handleSelectEpic = (epicId: string | null) => {
    if(!epicId){
      setSelectedEpicId(null)
    }
    const selectedEpic = epicData?.data.find((epic: ITask) => epic._id === epicId)
    console.log("form the handleSelectedEpic", selectedEpicId)
    if (selectedEpic) {
      setEpicTask(selectedEpic.title)
      setSelectedEpicId(selectedEpic._id)
      setOpenEpicModal(false)
    }

  }

  const handleAddWebLink = (url: string, linkText: string) => {
    setWebLinks((prev) => [...prev, { url, linkText }]);
  };

  const handleAddSubtask = (subtask: string) => {
    setSubtasks((prev) => [...prev, subtask])
  }


  // Handle form submission
  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    // console.log(workspaceId, projectId, taskId)
    if (!workspaceId || !projectId || !taskId) {
      setError("Workspace or project not selected")
      console.log("form the handleSubmitn not items")
      setSubmitting(false)
      return;
    }
    setError("")
    // console.log("testing the assingneMemberrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", assigneMember)
    try {
      const formData = new FormData();
      formData.append('title', values.taskTitle);
      formData.append('status', values.status || '');
      formData.append('description', values.description || '');

      formData.append('startDate', values.startDate || '');
      formData.append('endDate', values.endDate || '');
      formData.append('reporter', reporter?._id || '');
      // formData.append('subtasks', JSON.stringify(subtasks)); 
      if (selectedEpicId) formData.append('epicId', selectedEpicId || '');
      formData.append('webLinks', JSON.stringify(webLinks));
      if (isTask) {
        formData.append('assignee', assigneMember?._id || '');
      }


      files.forEach((file) => {
        formData.append('files', file);
      });

      // console.log('FormData contents:');
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      useUpdateTask.mutate(
        { workspaceId, projectId, taskId, task: formData },
        {
          onSuccess: () => {
            setFiles([]);
            setSubtasks([]);
            setWebLinks([]);
            onClose();
            // toast.success("Task updated successfully")
          },
          onError: (error: any) => {
            setError(error?.response?.data?.message || "Failed to update task");
          },
        }
      );
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  console.log("selected epic checkinggggggggg epicTask", epicTask)

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#191919',
          color: 'white',
          paddingTop: 1,
          paddingBottom: 1,
          borderRadius: 1,
          overflow: 'hidden',
          maxHeight: '80vh',
        },
      }}
    >
      <DialogContent className="dialog-scrollbar">
        <div className="flex flex-col gap-3.5 text-gray-300">
          {/* Header */}
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-purple-500 rounded-sm p-1">
                <BiSolidCheckboxMinus size={18} />
              </div>
              <span>{taskCount}</span>
            </div>
            <button
              className="text-gray-300 hover:text-white transition-colors"
              onClick={onClose}
              aria-label="Close modal"
            >
              <IoClose size={20} />
            </button>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="flex flex-col gap-4">
                {/* Task Title */}
                <div className="text-gray-400">
                  <Field
                    type="text"
                    name="taskTitle"
                    placeholder="Task Title"
                    className="w-full p-2 text-lg font-semibold rounded-sm focus:bg-[#131313] focus:border border-[#3a3a3a] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <ErrorMessage name="taskTitle" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* Actions and Status */}
                <div className="flex items-center gap-3">
                  {/* Add Button */}
                  <div className="relative">
                    <button
                      type="button"
                      className="flex items-center gap-1 border border-[#3a3a3a] px-3 py-1 rounded-sm hover:bg-[#333] transition-colors"
                      onClick={() => setOpenAddItem(!openAddItem)}
                    >
                      <IoAdd size={20} />
                      <span>Add</span>
                    </button>

                    {openAddItem && (
                      <div className="absolute left-0 top-full mt-1 bg-[#262626] py-1 rounded-sm shadow-sm min-w-[180px] z-50">
                        <ul className="text-gray-400">
                          <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#333] cursor-pointer transition-colors duration-150">
                            <label className="flex items-center gap-3 w-full cursor-pointer">
                              <FaPaperclip />
                              <span className="text-sm">Attachment</span>
                              <input
                                type="file"
                                multiple
                                accept="image/jpeg,image/png,application/pdf"
                                className="hidden"
                                onChange={handleFileChange}
                                aria-label="Upload attachments"
                              />
                            </label>
                          </li>
                          <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#333] cursor-pointer transition-colors duration-150"
                            onClick={handleOpenChildIssue}
                          >
                            <TbSubtask />
                            <span className="text-sm">Child Issue</span>
                          </li>
                          <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#333] cursor-pointer transition-colors duration-150"
                            onClick={handleOpenWebLink}>
                            <BsLink45Deg size={20} />
                            <span className="text-sm">Web Link</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Status Dropdown */}
                  <div className="relative">
                    <Field
                      as="select"
                      name="status"
                      className="px-2 py-1 border border-[#3a3a3a] rounded-sm bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="TO DO">TO DO</option>
                      <option value="IN PROGRESS">IN PROGRESS</option>
                      <option value="DONE">DONE</option>
                    </Field>
                    <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                {/* Description */}
                <div className="text-gray-400">
                  <label htmlFor="description" className="text-sm">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows={3}
                    placeholder="Task description"
                    className="mt-1 w-full p-2 rounded-sm border border-[#3a3a3a] bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                {/* attachment area */}


             
                <AttachmentPreview 
                files={files}
                handleRemoveFile={handleRemoveFile}
                taskFiles={task.files ? (Array.isArray(task.files) ? task.files : [task.files]) : undefined}
                 />


                {/* Web Link */}

                {/* <div>
                  <div>
                    <div className='flex items-center justify-between text-gray-400 mt-1'>
                    <p className="">Web Link</p>
                    <button onClick={(event) => {event.stopPropagation(); setOpenWebLink(true)}}><IoAdd/></button>
                    </div>
                    {task.webLinks.map((webLink) => (
                      <div className='flex items-center gap-2 text-gray-400 mt-1 mb-1'>
                        <p className='w-full p-2 border border-[#3a3a3a] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500'>{webLink.url}</p>
                        <p className='w-full p-2 border border-[#3a3a3a] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500'>{webLink.linkText}</p>
                        <button className='p-2 bg-[#6f6f6f45]/30 rounded-sm'><IoMdClose size={22} /></button>
                      </div>
                    ))}
                  </div>
                  {openWebLink && <OpenWebLinkModal toggleModale={() => setOpenWebLink(false)} onAddWebLink={handleAddWebLink} />}
                </div> */}

                <WebLinkPreview webLinks={task.webLinks} webLinkList={true}/>
                {webLinks && <WebLinkPreview webLinks={webLinks}/>}  
                {openWebLink && <OpenWebLinkModal toggleModale={() => setOpenWebLink(false)} onAddWebLink={handleAddWebLink} />}

                {/* child issue */}
                {openChildIssue && <ChildIssueModal toggleModal={() => setOpenChildIssue(false)} onAddSubTask={handleAddSubtask} />}

                {/* details container */}
                <div className='text-gray-400 border border-[#3a3a3a] rounded-sm'>
                  <div className='p-2 flex items-center justify-between bg-[#6f6f6f45]'
                    onClick={() => setOpenDetailsContainer(!openDetailsContainer)}
                  >
                    <h1>Details</h1>
                    <span>{openDetailsContainer ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                  </div>
                  {openDetailsContainer && <div className='flex flex-col gap-2 py-3 px-4'>
                    {isTask && <div className='flex items-center gap-2 relative'>
                      <label className='w-60'>Assignee</label>

                      <div className="flex gap-2 mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                        onClick={() => setIsOpenAssigne(!isOpenAssigne)}>
                        <UserAvatar user={assigneMember || undefined} width={6} height={6} getRandomColor={getRandomColor} getInitials={getInitials} />
                        <p>{assigneMember?.fullName} {assigneMember?.secondName}</p>
                        {isOpenAssigne && <div className='absolute bottom-11 right-0'>
                          <AssignMembers members={members || []} onSelectMember={handleSelectAssigneMember} />
                        </div>}
                      </div>
                    </div>}

                    <div className='flex items-center gap-2 relative'>
                      <label className='w-60'>Parent</label>
                      <div className="flex gap-2 mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                        onClick={() => setOpenEpicModal(!openEpicModal)}>
                        {/* {epicTask ? <p>{epicTask}</p> : <p>Add parent</p>} */}

                        {epicTask ? (<p>{epicTask}</p>) : selectedEpicId === null ? <p>Add Epic</p> : <p>Add parent</p>}
                        <div className='absolute bottom-11 right-0'>
                          {isTask && openEpicModal && <EpicListModal epicDetails={epicData?.data} onSelectEpic={handleSelectEpic} hasEpic={!!task.epic} />}
                        </div>
                      </div>
                    </div>


                    <div className='flex items-center gap-2'>
                      <label className='w-60'>Start Date</label>
                      <Field
                        type="date"
                        placeholder="None"
                        name="startDate"
                        className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                      />
                    </div>

                    <div className='flex items-center gap-2'>
                      <label className='w-60'>End Date</label>
                      <Field
                        type="date"
                        placeholder="None"
                        name="endDate"
                        className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                      />
                    </div>

                    <div className='flex items-center gap-2 relative'>
                      <label className='w-60'>Reporter</label>
                      <div className="flex gap-2 mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                        onClick={() => setIsOpenReporter(!isOpenReporter)}>
                        <UserAvatar user={reportMember || undefined} width={6} height={6} getRandomColor={getRandomColor} getInitials={getInitials} />
                        <p>{reportMember?.fullName} {reportMember?.secondName}</p>
                        {isOpenReporter && <div className='absolute bottom-11 right-0'>
                          <AssignMembers members={reportingMembers || []} onSelectMember={handleSelectReportMember} />
                        </div>}
                      </div>
                    </div>

                  </div>}
                </div>
                <div className='flex justify-end items-center gap-3'>
                  <button className='w-fit px-3 py-1 rounded-xs hover:bg-[#6f6f6f45]'
                    onClick={onClose}>
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-3 py-1 w-fit rounded-xs bg-[#669DF1] text-black hover:bg-[#5585D9] transition-colors"
                  >
                    Save
                  </button>

                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;