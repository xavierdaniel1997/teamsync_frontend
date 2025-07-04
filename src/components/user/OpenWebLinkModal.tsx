import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

interface OpenWebLinkProp {
  toggleModale: () => void;
  onAddWebLink: (url: string, linkText: string) => void;
}

const validationSchema = Yup.object({
  url: Yup.string().url("Must be a valid URL").required("URL is required"),
  linkText: Yup.string().optional(),
});

const initialValues = {
  url: "",
  linkText: "",
};

const OpenWebLinkModal: React.FC<OpenWebLinkProp> = ({
  toggleModale,
  onAddWebLink,
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onAddWebLink(values.url, values.linkText || "");
      resetForm();
      toggleModale();
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    formik.handleSubmit();
  };

  return (
    <div className="text-gray-400">
      <div className="flex gap-2 items-center">
        <div className="w-full">
          <label className="text-xs">URL</label>
          <input
            type="text"
            name="url"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="https://www.example.com"
            className="mt-1 w-full p-2 border border-[#3a3a3a] bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {formik.touched.url && formik.errors.url && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.url}</div>
          )}
        </div>
        <div className="w-full">
          <label className="text-xs">Link Text</label>
          <input
            type="text"
            name="linkText"
            value={formik.values.linkText}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Description"
            className="mt-1 w-full p-2 border border-[#3a3a3a] bg-[#131313] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {formik.touched.linkText && formik.errors.linkText && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.linkText}</div>
          )}
        </div>
      </div>
      <div className="mt-2 flex justify-end items-center gap-2">
        <button
          type="button"
          className="px-2.5 py-0.5 rounded-xs hover:bg-[#6f6f6f45] transition-colors"
          onClick={toggleModale}
        >
          Cancel
        </button>
        <button
          type="button" 
          className="px-2.5 py-0.5 rounded-xs bg-[#669DF1] text-black hover:bg-[#5585D9] transition-colors disabled:opacity-50"
          disabled={formik.isSubmitting}
          onClick={handleSubmit}
        >
          Link
        </button>
      </div>
    </div>
  );
};

export default OpenWebLinkModal;