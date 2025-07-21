import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import AddProjectRightItem from '../../../components/user/AddProjectRightItem';
import { useFormik } from 'formik';
import { projectValidationSchema } from './projectValidationSchema';
import { useProject } from '../../../hooks/useProject';
import { useWorkSpaceMutation } from '../../../hooks/useWorkSpace';
import { Tailspin } from 'ldrs/react'


const colorOptions = [
  { class: 'bg-blue-600', hex: '#0052CC' },
  { class: 'bg-green-500', hex: '#36B37E' },
  { class: 'bg-red-500', hex: '#FF5630' },
  { class: 'bg-purple-600', hex: '#6554C0' },
  { class: 'bg-cyan-500', hex: '#00B8D9' },
  { class: 'bg-fuchsia-600', hex: '#9C27B0' },
  { class: 'bg-indigo-600', hex: '#3F51B5' },
  { class: 'bg-emerald-500', hex: '#4CAF50' },
];



const AddProjectForm: React.FC = () => {
  const { useCreateProjectWithTeam } = useProject()
  const { useGetWorkSpace } = useWorkSpaceMutation();
  const navigate = useNavigate()

  const { data: workspace } = useGetWorkSpace;

  // console.log("workspace detials", workspace)


  const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      const email = e.currentTarget.value.trim();
      if (!formik.values.emails.includes(email)) {
        formik.setFieldValue("emails", [...formik.values.emails, email]);
      }
      e.currentTarget.value = "";
      e.preventDefault();
    }
  };

  const handleRemoveEmail = (email: string) => {
    formik.setFieldValue(
      "emails",
      formik.values.emails.filter((e) => e !== email)
    );
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      projectkey: '',
      title: '',
      color: { class: '', hex: '' },
      workspaceId: workspace?.data?.data?._id || '',
      emails: [] as string[],
    },
    validationSchema: projectValidationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!values.workspaceId) {
        console.log("check the value workspaceId", values.workspaceId)
      }
      useCreateProjectWithTeam.mutate(values, {
        onSuccess: async () => {
          resetForm()
          navigate("/project")
          // await handleWorkspaceSelection(dispatch, navigate);
        }
      })
    }
  })

  useEffect(() => {
    if (workspace?.data?.data?._id) {
      formik.setFieldValue('workspaceId', workspace.data.data._id);
    }
  }, [workspace]);



  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      {/* Header with back button */}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-10">
          <Link to="/project" className="flex gap-2 mr-8 mt-5 items-center text-gray-400 hover:text-white">
            <FaArrowLeft/>
            <span>Back to project</span>
          </Link>
        </div>

        {/* Main content container */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 justify-center border-b border-[#5A6060]/30 py-6">
          {/* Left side - Form */}
          <div>
            <h1 className="text-3xl font-medium mb-3 text-gray-400">Add project details</h1>
            <p className="text-gray-400 mb-6">
              Explore what's possible when you collaborate with your team. Edit project
              details anytime in project settings.
            </p>


            {/* Name field */}
            <div className="mb-4">
              <label className="flex items-center gap-1 mb-2">
                Name<span className="text-red-500">*</span>
                {formik.touched.name && formik.errors.name && (
                  <span className="text-red-500 text-sm">{formik.errors.name}</span>
                )}
              </label>
              <input
                type="text"
                className="w-full bg-[#2E3033] border border-[#404348] rounded p-2 text-white"
                name="name"
                placeholder="Project name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

            </div>

            {/* Key field */}
            <div className="mb-4">
              <label className="flex items-center gap-1 mb-2">
                Key<span className="text-red-500">*</span>
                {/* <FaInfoCircle className="ml-2 text-blue-400" size={14} /> */}
                {formik.touched.projectkey && formik.errors.projectkey && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.projectkey}</p>
                )}
              </label>
              <input
                type="text"
                className="w-full bg-[#2E3033] border border-[#404348] rounded p-2 text-white"
                name="projectkey"
                placeholder="Enter key"
                value={formik.values.projectkey}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {/* discription */}
            <div className="mb-4">
              <label className="flex items-center gap-1 mb-2">
                Title<span className="text-red-500">*</span>
                {formik.touched.name && formik.errors.title && (
                  <span className="text-red-500 text-sm">{formik.errors.title}</span>
                )}
              </label>
              <input
                type="text"
                className="w-full bg-[#2E3033] border border-[#404348] rounded p-2 text-white"
                name="title"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

            </div>



             <div className='mb-4'>
              <label className="flex items-center gap-1 mb-2">
                Color<span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3 flex-wrap">
                {colorOptions.map((color) => (
                  <div
                    key={color.class}
                    className={`w-10 h-10 rounded-md cursor-pointer border-1 transition-all duration-150  ${formik.values.color.class === color.class
                        ? 'border-gray-400 scale-110'
                        : 'border-transparent opacity-80'
                      } ${color.class}`}
                    onClick={() => formik.setFieldValue('color', color)}
                  />
                ))}
              </div>
            </div>

            

            {/* Team Members Field */}
            <div className="mb-4">
              <label className="block mb-2">
                Invite Team Members (Emails)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formik.values.emails.map((email) => (
                  <span
                    key={email}
                    className="bg-[#2E3033] border border-[#404348] text-white px-3 py-1 rounded flex items-center"
                  >
                    {email}
                    <IoClose
                      className="ml-2 text-red-400 cursor-pointer"
                      onClick={() => handleRemoveEmail(email)}
                    />
                  </span>
                ))}
              </div>
              <input
                type="email"
                onKeyDown={handleAddEmail}
                placeholder="Enter team member email and press Enter"
                className="w-full bg-[#2E3033] border border-[#404348] rounded p-2 text-white"
              />
            </div>
          </div>


          <AddProjectRightItem />
        </div>

        {/* Footer buttons */}
        <div className="mt-4 flex justify-end max-w-4xl mx-auto">
          <Link to="/project" className="bg-[#2E3033] text-white px-4 py-2 rounded mr-4 hover:bg-[#3E4043]">
            Cancel
          </Link>
          <button className="bg-[#0052CC] text-white px-4 py-2 rounded hover:bg-[#0065FF]"
            type='submit'>
            {/* Create project */}

            {useCreateProjectWithTeam.isPending ? (
              <>
                Creating...
                <Tailspin
                  size="20"
                  stroke="3"
                  speed="0.9"
                  color="white"
                />
              </>
            ) : "Create project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;




