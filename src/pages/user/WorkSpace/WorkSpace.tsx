import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import LogoImage from "../../../assets/teamsync-log.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useWorkSpaceMutation } from "../../../hooks/useWorkSpace";
import { createWorkSpace } from "../../../types/workSpace";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  siteName: Yup.string()
    .min(3, "Site name must be at least 3 characters")
    .required("Site name is required"),
});

const WorkSpace:React.FC = () => {
  const { useCreateWorkSpace } = useWorkSpaceMutation();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { siteName: "avulos-team" },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const data: createWorkSpace = {
        name: values.siteName
      }
      useCreateWorkSpace.mutate(data, {
        onSuccess: (response) => {
          console.log("Workspace created successfully", response);
          navigate("/subscriptions")
        },
        onError: (error: any) => {
          console.log("Failed to create workspace", error);
          const message = error.response?.data?.message || "Failed to create workspace";
          toast.error(message)
        },
        onSettled: () => {
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <div className="min-h-screen bg-[#252B2B] flex items-center justify-center px-4">
      <div className="bg-[#1A1D1D] text-white w-full max-w-md p-8 rounded-lg shadow-2xl backdrop-blur-md">
        <div className="text-center mb-1">
          <img src={LogoImage} alt="Logo" className="mx-auto h-20" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create a site
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Sites are the shared space where people organize teams, work, and
          projects.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <label
            htmlFor="siteName"
            className="block text-sm mb-2 text-gray-300"
          >
            Your site
          </label>

          <div className="relative flex items-center border border-green-500 rounded-lg px-4 py-2 bg-[#252B2B] focus-within:ring-2 focus-within:ring-green-500 transition-all duration-200">
            <input
              id="siteName"
              name="siteName"
              type="text"
              className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
              disabled={formik.isSubmitting || useCreateWorkSpace.isPending}
              value={formik.values.siteName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="text-gray-400 text-sm ml-1">.teamSync.net</span>
            <FiCheck className="text-green-500 ml-2" />
          </div>

          {formik.touched.siteName && formik.errors.siteName ? (
            <p className="text-xs text-red-500 mt-2">{formik.errors.siteName}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-2">
              This site name is just a suggestion. Feel free to change to
              something your team will recognize.
            </p>
          )}
{/* 
          {useCreateWorkSpace.isError && (
            <p className="text-xs text-red-500 mt-2">
              {useCreateWorkSpace.error?.message ||
                "Failed to create workspace"}
            </p>
          )} */}

          <button
            type="submit"
            disabled={formik.isSubmitting || useCreateWorkSpace.isPending}
            className={`w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white py-2 rounded-lg font-medium ${
              formik.isSubmitting || useCreateWorkSpace.isPending
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {formik.isSubmitting || useCreateWorkSpace.isPending
              ? "Creating..."
              : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkSpace;
