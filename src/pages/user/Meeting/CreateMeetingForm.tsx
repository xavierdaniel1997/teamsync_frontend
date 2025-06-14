import { Dialog, DialogContent } from '@mui/material';
import { IoAdd, IoClose } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaPaperclip } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';

// Define interfaces for type safety
interface CreateMeetingFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormValues {
    meetingTitle: string;
    members: string;
    meetingDate: string;
    meetingTime: string;
    duration: string;
    description: string;
}

// Validation schema using Yup
const validationSchema = Yup.object({
    meetingTitle: Yup.string().required('Meeting title is required'),
    members: Yup.string()
        .matches(
            /^[\w\.-]+@[\w\.-]+\.\w+(;[\w\.-]+@[\w\.-]+\.\w+)*$/,
            'Enter valid email addresses separated by semicolons'
        )
        .required('At least one member email is required'),
    meetingDate: Yup.date().required('Meeting date is required').nullable(),
    meetingTime: Yup.string().required('Meeting time is required'),
    duration: Yup.string().matches(/^\d{1,2}h\s*\d{0,2}m?$/, 'Enter duration like "1h 30m"').required('Duration is required'),
    description: Yup.string().optional(),
});

const CreateMeetingForm: React.FC<CreateMeetingFormProps> = ({ isOpen, onClose }) => {
    const [openAddItem, setOpenAddItem] = useState(false);
    const [openDetailsContainer, setOpenDetailsContainer] = useState(true);

    // Initial form values
    const initialValues: FormValues = {
        meetingTitle: '',
        members: '',
        meetingDate: '',
        meetingTime: '',
        duration: '',
        description: '',
    };

    // Handle form submission
    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            console.log('Form values:', values);
            setSubmitting(false);
            onClose();
        } catch (error) {
            console.error('Submission error:', error);
        }
    };


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
                            {/* Meeting Title */}
                            <div className="text-gray-400">
                                <Field
                                    type="text"
                                    name="meetingTitle"
                                    placeholder="Meeting Title"
                                    className="w-full p-2 font-semibold rounded-sm border focus:bg-[#131313] focus:border border-[#3a3a3a] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {/* <ErrorMessage name="meetingTitle" component="div" className="text-red-500 text-sm mt-1" /> */}
                            </div>



                            {/* Details Container */}
                            <div className="text-gray-400 border border-[#3a3a3a] rounded-sm">
                                <div
                                    className="p-2 flex items-center justify-between bg-[#6f6f6f45]"
                                    onClick={() => setOpenDetailsContainer(!openDetailsContainer)}
                                >
                                    <h1>Details</h1>
                                    <span>{openDetailsContainer ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                                </div>
                                {openDetailsContainer && (
                                    <div className="flex flex-col gap-2 py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <label className="w-60">Members</label>
                                            <Field
                                                type="text"
                                                name="members"
                                                placeholder="email@domain.com;email2@domain.com"
                                                className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                                            />
                                            {/* <ErrorMessage name="members" component="div" className="text-red-500 text-sm mt-1" /> */}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <label className="w-60">Meeting Date</label>
                                            <Field
                                                type="date"
                                                name="meetingDate"
                                                className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                                            />
                                            {/* <ErrorMessage name="meetingDate" component="div" className="text-red-500 text-sm mt-1" /> */}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <label className="w-60">Meeting Time</label>
                                            <Field
                                                type="time"
                                                name="meetingTime"
                                                className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                                            />
                                            {/* <ErrorMessage name="meetingTime" component="div" className="text-red-500 text-sm mt-1" /> */}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <label className="w-60">Duration</label>
                                            <Field
                                                type="text"
                                                name="duration"
                                                placeholder="1h 30m"
                                                className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                                            />
                                            {/* <ErrorMessage name="duration" component="div" className="text-red-500 text-sm mt-1" /> */}
                                        </div>
                                    </div>
                                )}
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
                                    placeholder="Meeting agenda or description"
                                    className="mt-1 w-full p-2 rounded-sm border border-[#3a3a3a] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {/* <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" /> */}
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