import { Dialog, DialogContent } from '@mui/material'
import React from 'react'
import { IoClose } from 'react-icons/io5';
import { ITask } from '../../types/task';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { statusTypes } from '../../utils/taskConfing';
import AttachmentPreview from './AttachmentPreview';
import { IoIosArrowDown } from 'react-icons/io';
import UserAvatar from '../globa/UserAvatar';
import { getInitials, getRandomColor } from '../../utils/userHelpers';
import { formatInTimeZone } from 'date-fns-tz';
import { RiLinkM } from 'react-icons/ri';

interface KanbanTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskDetails: ITask;
}

const KanbanTaskModal: React.FC<KanbanTaskModalProps> = ({ isOpen, onClose, taskDetails }) => {

    const project = useSelector((state: RootState) => state.project.selectedProject)

    const currentStatus = statusTypes.find((statusType) => statusType.id === taskDetails.status)

    console.log("form the kanbanTaskModal", taskDetails)
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="lg"
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
                <div className="flex flex-col gap-4 text-gray-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <div className=" rounded-sm p-1">
                                <svg width="23" height="23" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 2L6 13H11L11 22L18 11H13L13 2Z"
                                        stroke={project?.color.hex}
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                            <span className='text-gray-400'>{taskDetails.epic?.taskKey} {taskDetails.epic?.taskKey && <span>/ </span>} {taskDetails.taskKey}</span>
                        </div>
                        <button
                            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <IoClose size={20} />
                        </button>
                    </div>
                    <div className='flex text-gray-400 px-4 py-3 gap-6'>

                        {/* left section */}
                        <div className='flex-[1.5] space-y-5'>
                            <h1 className='text-lg font-semibold'>{taskDetails?.title}</h1>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center gap-2'>
                                    <span>Status :</span>
                                    <p className={`${currentStatus?.bgColor} ${currentStatus?.textColor} text-xs w-fit px-2 py-1 rounded-sm`}>{currentStatus?.label}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span>Epic :</span>
                                    <p className={`text-gray-400 text-xs w-fit px-2 py-1 rounded-sm`}
                                        style={{ backgroundColor: project?.color.hex }}>{taskDetails.epic?.title}</p>
                                </div>
                            </div>
                            <p className=''>{taskDetails?.description}</p>
                            {/* <AttachmentPreview taskFiles={taskDetails.files}/> */}
                            <AttachmentPreview files={[]} isNotUpload={false} taskFiles={Array.isArray(taskDetails.files) ? taskDetails.files : taskDetails.files ? [taskDetails.files] : undefined} width={40} height={32} />

                            <div className='space-y-2'>
                                {taskDetails.webLinks.map((weblink: any) => (
                                        <div className='flex items-center gap-4 hover:bg-[#212121] p-2 rounded-sm'>
                                            <RiLinkM />
                                            <a href={weblink.url}>{weblink.linkText}</a>
                                        </div>
                                ))}
                            </div>
                        </div>


                        {/* right section */}
                        <div className='flex-1 text-gray-400 border border-[#3a3a3a] rounded-sm'>
                            <div className='p-2 flex items-center justify-between bg-[#6f6f6f45]'>
                                <h1>Details</h1>
                                <span>{<IoIosArrowDown />}</span>
                            </div>
                            <div className='p-4 space-y-6'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-sm w-24'>Assigne</span>
                                    <div className='flex w-full hover:bg-[#212121] p-2 rounded-xs gap-2'>
                                        {typeof taskDetails.assignee === 'object' && taskDetails.assignee !== null && (
                                            <UserAvatar
                                                user={taskDetails.assignee}
                                                width={6}
                                                height={6}
                                                getRandomColor={getRandomColor}
                                                getInitials={getInitials}
                                            />
                                        )}

                                        {typeof taskDetails.assignee === 'object' && taskDetails.assignee !== null && (
                                            <p>
                                                {taskDetails.assignee.fullName} {taskDetails.assignee.secondName}
                                            </p>
                                        )}

                                    </div>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <span className='text-sm w-24'>Parent</span>
                                    <p className='flex w-full hover:bg-[#212121] p-2 rounded-xs'>
                                        {taskDetails?.epic?.title}
                                    </p>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <span className='text-sm w-24'>Sprint</span>
                                    <p className='flex w-full hover:bg-[#212121] p-2 rounded-xs text-green-500/70 font-mono'>
                                        {typeof taskDetails.sprint === 'object' && taskDetails.sprint !== null && 'sprintName' in taskDetails.sprint
                                            ? (taskDetails.sprint as { sprintName: string }).sprintName
                                            : taskDetails.sprint}
                                    </p>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <span className='text-sm w-24'>Start Date</span>
                                    <p className='flex w-full hover:bg-[#212121] p-2 rounded-xs text-green-500/70 font-mono'>
                                        {typeof taskDetails.sprint === 'object' && taskDetails.sprint !== null
                                            ? (taskDetails.sprint.startDate
                                                ? formatInTimeZone(new Date(taskDetails.sprint.startDate), 'Asia/Kolkata', 'MMM d, yyyy h:mm a')
                                                : 'N/A')
                                            : taskDetails.sprint}
                                    </p>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <span className='text-sm w-24'>Dead line</span>
                                    <p className='flex w-full hover:bg-[#212121] p-2 rounded-xs text-red-500/70 font-mono'>
                                        {typeof taskDetails.sprint === 'object' && taskDetails.sprint !== null
                                            ? (taskDetails.sprint.endDate
                                                ? formatInTimeZone(new Date(taskDetails.sprint.endDate), 'Asia/Kolkata', 'MMM d, yyyy h:mm a')
                                                : 'N/A')
                                            : taskDetails.sprint}
                                    </p>
                                </div>

                                <div className='flex items-center gap-2'>
                                    <span className='text-sm w-24'>Report to</span>
                                    <div className='flex w-full hover:bg-[#212121] p-2 rounded-xs gap-2'>
                                        {typeof taskDetails.reporter === 'object' && taskDetails.reporter !== null && (
                                            <UserAvatar
                                                user={taskDetails.reporter}
                                                width={6}
                                                height={6}
                                                getRandomColor={getRandomColor}
                                                getInitials={getInitials}
                                            />
                                        )}

                                        {typeof taskDetails.reporter === 'object' && taskDetails.reporter !== null && (
                                            <p>
                                                {taskDetails.reporter.fullName} {taskDetails.reporter.secondName}
                                            </p>
                                        )}

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default KanbanTaskModal