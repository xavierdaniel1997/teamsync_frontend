import { Dialog, DialogContent } from '@mui/material';
import { IoAdd, IoClose } from 'react-icons/io5';
import { BsLink45Deg } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TbSubtask } from "react-icons/tb";
import { BiSolidCheckboxMinus } from 'react-icons/bi';
import { FaPaperclip } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

// Define interfaces for type safety
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  epicId?: string;
  epicTitle?: string;
  taskCount?: number;
  members?: string[]; 
}

interface FormValues {
  taskTitle: string;
  status: 'TO DO' | 'IN PROGRESS' | 'DONE';
  description: string;
  url: string;
  linkText: string;
}

// Validation schema using Yup
const validationSchema = Yup.object({
  taskTitle: Yup.string().required('Task title is required'),
  status: Yup.string()
    .oneOf(['TO DO', 'IN PROGRESS', 'DONE'], 'Invalid status')
    .required('Status is required'),
  description: Yup.string().optional(),
  url: Yup.string().url('Must be a valid URL').optional(),
  linkText: Yup.string().optional(),
});

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, epicTitle, taskCount}) => {
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openWebLink, setOpenWebLink] = useState(false);
  const [openChildIssue, setOpenChildIssue] = useState(false);
  const [openDetailsContainer, setOpenDetailsContainer] = useState(true)
  const [files, setFiles] = useState<File[]>([]);

  // Initial form values
  const initialValues: FormValues = {
    taskTitle: epicTitle || '',
    status: 'TO DO',
    description: '',
    url: '',
    linkText: '',
  };

  // Handle form submission
  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      console.log('Form values:', values);
      console.log('Files:', files);
      setSubmitting(false);
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleOpenWebLink = () => {
    setOpenWebLink(true)
    setOpenAddItem(false)
  }

  const handleOpenChildIssue = () => {
    setOpenChildIssue(true)
    setOpenAddItem(false)
  }


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

                {/* Web Link */}

                {openWebLink && <div className="text-gray-400">
                  <label className="text-sm">Web Link</label>
                  <div className="flex gap-2 items-center">
                    <div className="w-full">
                      <label className="text-xs">URL</label>
                      <Field
                        type="text"
                        name="url"
                        placeholder="https://www.example.com"
                        className="mt-1 w-full p-2 border border-[#3a3a3a] bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <ErrorMessage name="url" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div className="w-full">
                      <label className="text-xs">Link Text</label>
                      <Field
                        type="text"
                        name="linkText"
                        placeholder="Description"
                        className="mt-1 w-full p-2 border border-[#3a3a3a] bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <ErrorMessage name="linkText" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                    <div className="mt-2 flex justify-end items-center gap-2">
                  <button
                    type="button"
                    className="px-2.5 py-0.5 rounded-xs hover:bg-[#6f6f6f45] transition-colors"
                    onClick={() => setOpenWebLink(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-0.5 rounded-xs bg-[#669DF1] text-black hover:bg-[#5585D9] transition-colors disabled:opacity-50"
                  >
                    Link
                  </button>
                </div>
                </div>}


                {/* child issue */}
                {openChildIssue && <div className=''>
                  <div className='flex gap-2'>
                  <button className='text-gray-400 flex justify-center items-center gap-2 border border-[#3a3a3a] bg-[#131313] w-60 px-3 py-2 rounded-sm'>
                    <TbSubtask size={20} className='text-blue-500'/>
                    Sub Task
                  </button>
                  <Field
                    type="text"
                    name="subtask"
                    placeholder="What need to be done?"
                    className="w-full p-1.5 rounded-sm bg-[#131313] border border-[#3a3a3a] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  </div>
                   <div className="mt-2 flex justify-end items-center gap-2">
                  <button
                    type="button"
                    className="px-2.5 py-0.5 rounded-xs hover:bg-[#6f6f6f45] transition-colors"
                    onClick={() => setOpenChildIssue(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-0.5 rounded-xs bg-[#669DF1] text-black hover:bg-[#5585D9] transition-colors disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
                </div>}

                {/* details container */}
                <div className='text-gray-400 border border-[#3a3a3a] rounded-sm'>
                  <div className='p-2 flex items-center justify-between bg-[#6f6f6f45]'
                  onClick={() => setOpenDetailsContainer(!openDetailsContainer)}
                  >
                    <h1>Details</h1>
                    <span>{openDetailsContainer ? <IoIosArrowUp /> : <IoIosArrowDown/>}</span>
                  </div>
                  {openDetailsContainer && <div className='flex flex-col gap-2 py-3 px-4'>
                    <div className='flex items-center gap-2'>
                      <label className='w-60'>Assignee</label>
                      <Field
                        type="text"
                        placeholder="assignee"
                        name="assigne"
                        className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                      />
                    </div>

                    <div className='flex items-center gap-2'>
                      <label className='w-60'>Parent</label>
                      <Field
                        type="text"
                        placeholder="parent"
                        name="parent"
                        className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                      />
                    </div>


                    <div className='flex items-center gap-2'>
                      <label className='w-60'>Start Date</label>
                      <Field
                        type="date"
                        placeholder="None"
                        className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                      />
                    </div>

                    <div className='flex items-center gap-2'>
                      <label className='w-60'>End Date</label>
                      <Field
                        type="date"
                        placeholder="None"
                        className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                      />
                    </div>

                     <div className='flex items-center gap-2'>
                      <label className='w-60'>Reporter</label>
                      <Field
                        type="text"
                        placeholder="Reporter"
                        name="reporter"
                        className="mt-1 w-full p-2 focus:border border-[#3a3a3a] focus:bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hover:bg-[#212121]"
                      />
                    </div>

                  </div>}
                </div>

                {/* Form Actions */}
                {/* <div className="mt-2 flex justify-end items-center gap-2">
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
                    Save
                  </button>
                </div> */}
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;