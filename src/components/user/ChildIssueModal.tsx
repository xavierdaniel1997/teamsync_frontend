import { Field } from "formik";
import React from "react";
import { TbSubtask } from "react-icons/tb";
import { useFormik } from "formik";

interface ChildIssuePrope {
  toggleModal: () => void;
  onAddSubTask: (subtask: string) => void;
}

const initialValues = {
  subtask: ""
}

const ChildIssueModal: React.FC<ChildIssuePrope> = ({ toggleModal, onAddSubTask }) => {

  const formik = useFormik({
    initialValues,
    onSubmit: (values, {resetForm}) => {
      console.log("from the childIssueModal subtask", values.subtask)
      onAddSubTask(values.subtask)
      resetForm()
      toggleModal()
    }
  })

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); 
      formik.handleSubmit();
    };

  return (
    <div>
      <div className="flex gap-2">
        <button className="text-gray-400 flex justify-center items-center gap-2 border border-[#3a3a3a] bg-[#131313] w-60 px-3 py-2 rounded-sm">
          <TbSubtask size={20} className="text-blue-500" />
          Sub Task
        </button>
        <Field
          type="text"
          name="subtask"
          value={formik.values.subtask}
          onChange={formik.handleChange}
          placeholder="What need to be done?"
          className="w-full p-1.5 rounded-sm bg-[#131313] border border-[#3a3a3a] focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="mt-2 flex justify-end items-center gap-2">
        <button
          type="button"
          className="px-2.5 py-0.5 rounded-xs hover:bg-[#6f6f6f45] transition-colors"
          onClick={toggleModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-2.5 py-0.5 rounded-xs bg-[#669DF1] text-black hover:bg-[#5585D9] transition-colors disabled:opacity-50"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChildIssueModal;
