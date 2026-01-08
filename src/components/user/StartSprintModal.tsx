import { Dialog, DialogContent } from '@mui/material'
import { IoIosArrowDown } from "react-icons/io";
import React from 'react'
import { IoClose } from 'react-icons/io5';
import { useFormik } from 'formik';
import { useProject } from '../../hooks/useProject';
import { useNavigate } from 'react-router-dom';


interface StartSprintModalProps {
    isOpen: boolean;
    onClose: () => void;
    sprintName: string;
    workspaceId: string;
    projectId: string;
    sprintId: string;
}

const StartSprintModal: React.FC<StartSprintModalProps> = ({ isOpen, onClose, sprintName, workspaceId, projectId, sprintId }) => {

    const { useStartSprint } = useProject();
    const navigte = useNavigate()

    const formik = useFormik({
        initialValues: {
            sprintName: sprintName || '',
            duration: 'week 1',
            startDate: '',
            endDate: '',
            sprintGoal: '',
        },
        onSubmit: (values, { resetForm }) => {
            if (workspaceId && projectId && sprintId) {
                useStartSprint.mutate({ workspaceId, projectId, sprintId, data: values },
                    {
                        onSuccess: () => {
                            resetForm();
                            onClose();
                            navigte("/project/board");
                        },
                        onError: () => {
                            console.log("failed to start the sprint")
                        }
                    }
                )
            }

        }
    })

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
                    paddingTop: 0.1,
                    paddingBottom: 1,
                    borderRadius: 1,
                    overflow: 'hidden',
                    maxHeight: '80vh',
                },
            }}
        >
            <DialogContent className="dialog-scrollbar">
                <div className='text-gray-400'>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-semibold'>Start Sprint</h1>
                        <button className="cursor-pointer" onClick={onClose}>
                            <IoClose size={20} />
                        </button>
                    </div>
                    <p className='pt-3'>1 work item will be included in this sprint.</p>
                    <form onSubmit={formik.handleSubmit} className='pt-3 flex flex-col gap-4'>
                        <div className="">
                            <label className="block text-sm font-medium mb-1">
                                Sprint name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="SCRUM Sprint 2"
                                name="sprintName"
                                value={formik.values.sprintName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-xs p-2 bg-[#131313] border border-[#3a3a3a] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mb-1">
                                Duration <span className="text-red-500">*</span>
                            </label>
                            <div className='relative w-xs'>
                                <select
                                    name="duration"
                                    value={formik.values.duration}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="appearance-none w-xs p-2 bg-[#131313] border border-[#3a3a3a] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >

                                    <option value="week 1">Week 1</option>
                                    <option value="week 2">Week 2</option>
                                    <option value="week 3">Week 3</option>
                                    <option value="week 4">Week 4</option>
                                    <option value="week 5">Week 5</option>
                                </select>
                                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <IoIosArrowDown className="text-xl" />
                                </div>
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mb-1">
                                Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-xs p-2 bg-[#131313] border border-[#3a3a3a] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mb-1">
                                End Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={formik.values.endDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-xs p-2 bg-[#131313] border border-[#3a3a3a] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mb-1">
                                Sprint goal <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="sprintGoal"
                                rows={4}
                                value={formik.values.sprintGoal}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 bg-[#131313] border border-[#3a3a3a] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className='flex justify-end gap-3'>
                            <button className='hover:bg-[#6f6f6f45] px-2.5 py-1 rounded-xs'
                                onClick={onClose}
                            >Cancel</button>
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className='bg-[#669DF1] text-black px-2.5 py-1 rounded-xs'>Save</button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default StartSprintModal