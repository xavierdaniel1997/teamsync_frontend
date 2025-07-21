import React, { useEffect, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useFormik } from "formik";
import { useProject } from "../../../hooks/useProject";
import { MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import DeleteItemsModal from "../../../components/user/DeleteItemsModal";

const ProjectSettingForm: React.FC = () => {
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId)
  const project = useSelector((state: RootState) => state.project.selectedProject)
  const { useUpdateProject, useDeleteProject } = useProject()
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);



  const formik = useFormik({
    initialValues: {
      name: project?.name || '',
      projectkey: project?.projectkey || '',
      title: project?.title || '',
      description: project?.description || '',
      projectCoverImg: null as File | null,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('projectkey', values.projectkey);
      formData.append('title', values.title);
      formData.append('description', values.description);
      if (values.projectCoverImg instanceof File) {
        formData.append("projectCoverImg", values.projectCoverImg);
      }
      if (!project?._id || !workspaceId) return;
      useUpdateProject.mutate({ projectId: project._id, workspaceId, data: formData });
    }
  })



  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Only JPEG, PNG, or GIF files are allowed.');
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert('File size exceeds 5MB.');
        return;
      }
      formik.setFieldValue(field, file);
    }
  };

  useEffect(() => {
    if (formik.values.projectCoverImg instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(formik.values.projectCoverImg);
    } else {
      setCoverPreview(project?.projectCoverImg || null);
    }
  }, [formik.values.projectCoverImg, project?.projectCoverImg]);

  const handleDeleteConfirm = () => {
    if (!project?._id || !workspaceId) {
      return;
    }
    useDeleteProject.mutate({ projectId: project._id, workspaceId })
    setIsModalOpen(false)
  };


  return (
    <div className="bg-[#191919] text-gray-300 min-h-[93vh] h-auto p-6 px-10">
      {/* Cover Image with Overlaid Header */}
      <div className="relative h-64 bg-cover bg-center rounded-xl overflow-hidden">
        <img
          src={coverPreview || "https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=2070&auto=format&fit=crop"}
          alt="Project cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 flex items-center bg-[#000000a6] p-2 rounded">
          <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center mr-2">
            <span className="text-lg">🕒</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{project?.name}</h2>
          </div>
        </div>
        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, 'projectCoverImg')}
        />
        <label htmlFor="cover-upload" className="cursor-pointer">
          <span className="absolute bottom-3 right-4 bg-[#2d2d2dd2] text-white text-sm px-3 py-1 rounded hover:bg-[#3a3a3a] inline-block">
            Change cover
          </span>
        </label>
      </div>

      <form className="mt-6 space-y-6" onSubmit={formik.handleSubmit}>
        {/* Project Name */}
        <div>
          <label className="block mb-1 text-sm">Project name</label>
          <input
            type="text"
            name="name"
            defaultValue="TeamSync"
            className="w-full border border-[#3a3a3a] p-2 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm">Description</label>
          <textarea
            defaultValue="A project management software"
            className="w-full border border-[#3a3a3a] p-2 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {/* Project ID and Network */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm">Project Title</label>
            <input
              type="text"
              defaultValue="TeamSync"
              className="w-full border border-[#3a3a3a] p-2 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Project ID</label>
            <div className="flex items-center border border-[#3a3a3a] rounded p-2 bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500">
              <span className="mr-2">{project?._id}</span>
              <FaInfoCircle className="text-gray-400 ml-auto" />
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div>
          <label className="block mb-1 text-sm">Project Timezone</label>
          <select className="w-full border border-[#3a3a3a] p-2 rounded bg-[#2b2b2b] focus:bg-[#131313] focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>UTC</option>
          </select>
        </div>

        {/* Update Button */}
        <div className="flex justify-between items-center mb-8">
          <button className="text-gray-400 bg-blue-600/50 hover:bg-blue-700 px-3 py-1 rounded"
            type="submit"
            disabled={useUpdateProject.isPending}
          >
            {useUpdateProject.isPending ? 'Saving...' : 'Save changes'}
          </button>

          {/* Meta info */}
          <p className="text-sm text-gray-500">Created on Apr 12, 2025</p>
        </div>
      </form>
      {/* Archive / Delete actions */}
      <div className="pt-6 border-t border-[#333] space-y-3">
        <div className="flex justify-between items-center"
          onClick={() => setShowDeleteBtn(!showDeleteBtn)}>
          <button className="w-full text-left text-gray-400  text-lg font-semibold">Delete project</button>
          <button className="text-gray-400 cursor-pointer"
          >
            {showDeleteBtn ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowRight size={22} />}
          </button>
        </div>
        {showDeleteBtn && <div className="space-y-3">
          <p className="text-gray-400">When deleting a project, all of the data and resources within that project will be permanently removed and cannot be recovered.</p>
          <button className="text-gray-400 tw-fit bg-red-500/50 px-3 py-1 rounded-sm cursor-pointer"
            onClick={() => setIsModalOpen(true)}>Delete my project</button>
        </div>}
      </div>

      <DeleteItemsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectName={project?.name || ""}
        onDelete={handleDeleteConfirm}
      />
    </div>
  );
};

export default ProjectSettingForm;