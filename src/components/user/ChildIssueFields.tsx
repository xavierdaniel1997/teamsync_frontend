import StatusInput from "./StatusInput";

interface ChildIssueFieldsProps {
  onCancel: () => void;
}

const ChildIssueFields: React.FC<ChildIssueFieldsProps> = ({ onCancel }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-gray-200">Child Issue</div>
      <StatusInput
        statusValue="STORY"
        taskValue=""
        placeholder="Enter task details"
        statusOptions={[
          { value: "STORY", label: "Story" },
          { value: "TASK", label: "Task" },
          { value: "BUG", label: "Bug" },
        ]}
      />
      <div className="flex gap-2 justify-end">
        <button className="bg-blue-400 px-2 py-0.5 rounded-sm cursor-pointer text-sm text-white">
          Create
        </button>
        <button
          className="bg-[#43414197] px-2 py-0.5 rounded-sm cursor-pointer text-sm text-gray-200"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChildIssueFields;