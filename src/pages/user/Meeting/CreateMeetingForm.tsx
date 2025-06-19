import { Dialog, DialogContent } from '@mui/material';
import { IoAdd, IoClose } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaPaperclip } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import AssignMembers from '../../../components/user/AssignMembers';
import { useMeeting } from '../../../hooks/useMeeting';
import { v4 as uuidv4 } from 'uuid'; 
import { validationSchema } from './validateForm';

// Define interfaces for type safety
interface CreateMeetingFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormValues {
    meetingTitle: string;
    meetingDate: string;
    meetingTime: string;
    duration: string;
    description: string;
}



const CreateMeetingForm: React.FC<CreateMeetingFormProps> = ({ isOpen, onClose }) => {
    const [openDetailsContainer, setOpenDetailsContainer] = useState(true);
    const [isOpenMember, setIsOpenMember] = useState(false)
    const [selectedMembers, setSelectedMembers] = useState<{ userId: string ; email: string }[]>([]);
    const project = useSelector((state: RootState) => state.project.selectedProject)
    const memberFieldRef = useRef<HTMLDivElement>(null);
    const { useCreateMeeting } = useMeeting()

    // Initial form values
    const initialValues: FormValues = {
        meetingTitle: '',
        meetingDate: '',
        meetingTime: '',
        duration: '',
        description: '',
    };

    // Handle form submission
    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const meetingId = uuidv4();
            // console.log('Form values:', { ...values, members: selectedMembers });
            const payload = {
                ...values,
                meetingId,
                members: selectedMembers,
            };
            console.log('Submitting payload:', payload);
            useCreateMeeting.mutate(payload)
            setSubmitting(false);
            onClose();
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    console.log("meeting members list", selectedMembers)

    const handleAddMembers = (userId: string | null) => {
        if (userId) {
            const member = project?.members.find((member) => member.user._id === userId)
            console.log("members details form the handleAddMembers", member)
            if (member) {
                setSelectedMembers((prev) => {
                    const isSelected = prev.some((m) => m.userId == userId)
                    if (isSelected) {
                        return prev.filter((m) => m.userId !== userId)
                    } else {
                        return [...prev, { userId: member?.user._id!, email: member?.user.email }]
                    }
                })
            }
        }
    }

    const handleRemoveMember = (userId: string | undefined) => {
        setSelectedMembers((prev) => prev.filter((m) => m.userId !== userId));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (memberFieldRef.current && !memberFieldRef.current.contains(event.target as Node)) {
                setIsOpenMember(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (

        <DialogContent className="dialog-scrollbar">
            <div className="flex flex-col gap-4 text-gray-400">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold mb-3">Schedule Meeting</h1>
                </div>

                {/* Form */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-4">

                            <div className="text-gray-400">
                                <Field
                                    type="text"
                                    name="meetingTitle"
                                    placeholder="Meeting Title"
                                    className="w-full p-2 font-semibold rounded-sm border focus:bg-[#131313] focus:border border-[#3a3a3a] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>



                            {/* Details Container */}
                            <div className="text-gray-400 border border-[#3a3a3a] rounded-sm">
                                <div
                                    className="p-2 flex items-center justify-between bg-[#6f6f6f45]"
                                    onClick={() => setOpenDetailsContainer(!openDetailsContainer)}
                                >
                                    <h1 className='text-lg'>Details</h1>
                                    <span>{openDetailsContainer ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                                </div>
                                {openDetailsContainer && (
                                    <div className="flex flex-col gap-2 py-3 px-4">
                                        <div className="flex items-center gap-2 relative" ref={memberFieldRef}>
                                            <span className="w-60">Members</span>
                                            <div className="mt-1 w-full p-2 border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus-within:ring-1 focus-within:ring-blue-500 hover:bg-[#212121] flex flex-wrap gap-1 items-center min-h-[38px]">
                                                {selectedMembers.map((member) => (
                                                    <div
                                                        key={member.userId}
                                                        className="flex items-center gap-1 bg-[#2E2E2E] text-white text-sm px-2 py-0.5 rounded-sm"
                                                    >
                                                        <span>{member.email}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveMember(member.userId)}
                                                            className="text-gray-400 hover:text-white"
                                                            aria-label={`Remove ${member.email}`}
                                                        >
                                                            <IoClose size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <Field
                                                    type="text"
                                                    name="members"
                                                    placeholder={selectedMembers.length === 0 ? "Select members..." : ""}
                                                    className="flex-1 bg-transparent focus:outline-none text-gray-400 min-w-[100px]"
                                                    onClick={() => setIsOpenMember(true)}
                                                    readOnly
                                                />
                                            </div>
                                            {isOpenMember && <div className="absolute right-0 top-12 w-auto z-50">
                                                <AssignMembers members={project?.members || []} onSelectMember={handleAddMembers} />
                                            </div>}
                                        </div>

                                        <div className="flex items-center gap-2 ">
                                            <span className="w-60">Meeting Date</span>
                                            <Field
                                                type="date"
                                                name="meetingDate"
                                                className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"

                                            />

                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="w-60">Meeting Time</span>
                                            <Field
                                                type="time"
                                                name="meetingTime"
                                                className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="w-60">Duration</span>
                                            <Field
                                                type="text"
                                                name="duration"
                                                placeholder="1h 30m"
                                                className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>


                            {/* Description */}
                            <div className="text-gray-400">
                                <span className="">
                                    Description
                                </span>
                                <Field
                                    as="textarea"
                                    name="description"
                                    rows={3}
                                    placeholder="Meeting agenda or description"
                                    className="mt-1 w-full p-2 rounded-sm border border-[#3a3a3a] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>

                            {/* Form Actions */}
                            <div className="mt-2 flex justify-end items-center gap-2">
                                <button
                                    type="button"
                                    className="px-2.5 py-1 rounded-xs hover:bg-[#6f6f6f45] transition-colors"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-2.5 py-1 rounded-xs bg-[#669DF1] text-black hover:bg-[#5585D9] transition-colors disabled:opacity-50"
                                >
                                    Schedule
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </DialogContent>
    );
};

export default CreateMeetingForm;