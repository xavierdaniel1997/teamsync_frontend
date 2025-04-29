import { useCallback, useState } from "react";
import { Formik, Form, Field } from "formik";
import EditableTextField from "./EditableTextField";
import TaskPreview from "./TaskPreview";
import StatusDropdown from "./StatusDropdown";
import WebLinkFields from "./WebLinkFields";
import ChildIssueFields from "./ChildIssueFields";
import AssigneeDropdown from "./AssigneeDropdown";
import { IoAdd } from "react-icons/io5";
import { FaLink, FaPaperclip } from "react-icons/fa";
import { BsListNested } from "react-icons/bs";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import useFileHandler from "../../hooks/useFileHandler";
import { debounce } from "../../utils/debounce";
import { useProject } from "../../hooks/useProject";
import { ITask } from "../../types/task";
import ReporterDropdown from "./ReporterDropdown";
import ParentDropdown from "./ParentDropdown";

interface Epic {
  _id: string;
  title: string;
}

interface TaskFormProps {
  epicTitle: string;
  members: { user: { _id: string; fullName: string; secondName: string }; accessLevel: string }[];
  onClose: () => void;
  epicId?: string;
  epics?: Epic[];
}

interface TaskFormValues {
  title: string;
  description: string;
  assignee: string;
  parent: string;
  startDate: string;
  dueDate: string;
  reporter: string;
  taskStatus: string;
  webLinkUrl: string;
  webLinkText: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ epicTitle, members, onClose, epicId }) => {
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [showChildIssueFields, setShowChildIssueFields] = useState(false);
  const [showWebLink, setShowWebLink] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const {useCreateTask,  useUpdateTask} = useProject()

  const defaultEpics: Epic[] = [{ _id: epicId || "", title: epicTitle }]

  const {
    attachments,
    fileUrls,
    uploadError,
    handleFileChange,
    handleDeleteAttachment,
  } = useFileHandler(() => {
    setOpenAddMenu(false);
  });

  const owners = members.filter(member => member.accessLevel === "OWNER");
  const initialReporter = owners.length > 0 ? owners[0].user._id : "";

  const initialValues: TaskFormValues = {
    title: epicTitle,
    description: "",
    assignee: "",
    parent: epicId ||  "",
    startDate: "",
    dueDate: "",
    reporter: initialReporter,
    taskStatus: "",
    webLinkUrl: "",
    webLinkText: "",
  };

  const updateTaskByOnchange = useCallback(
    debounce((task:  Partial<ITask>) => {
      if(epicId){
        useUpdateTask.mutate(
          {taskId: epicId, task},
          {
            onSuccess: () => console.log("Epic updated successfully"),
            onError: (error) => console.error("Failed to update epic", error),
          }
        )
      }
    }, 500),
    [epicId, useUpdateTask]
  )

  
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form className="flex flex-col gap-4 bg-[#1A1A1A] rounded-lg">
        <Field name="title">
          {({ field }: any) => (
            <EditableTextField
              {...field}
              placeholder="Project Name"
              variant="outlined"
              fullWidth
              size="small"
              displayClassName="text-2xl font-semibold text-gray-200 cursor-pointer"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e);
                updateTaskByOnchange({ title: e.target.value });
              }}
            />
          )}
        </Field>

        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1 bg-[#0D0F11] py-1.5 px-3 rounded-sm cursor-pointer text-sm text-gray-200 hover:bg-[#333] transition-colors duration-150"
            onClick={() => setOpenAddMenu(!openAddMenu)}
          >
            <IoAdd size={20} />
            <span>Add</span>
          </button>
          {openAddMenu && (
            <div className="absolute left-0 top-full mt-1 bg-[#262626] py-1 rounded shadow-sm min-w-[180px] z-50">
              <ul>
                <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#333] cursor-pointer transition-colors duration-150">
                  <label className="flex items-center gap-3 w-full cursor-pointer">
                    <FaPaperclip className="text-blue-400" />
                    <span className="text-sm text-gray-200">Attachment</span>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      aria-label="Upload attachments"
                      aria-describedby="upload-error"
                    />
                  </label>
                </li>
                <li
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#333] cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    setShowChildIssueFields(true);
                    setOpenAddMenu(false);
                  }}
                >
                  <BsListNested className="text-green-400" />
                  <span className="text-sm text-gray-200">Child Issue</span>
                </li>
                <li
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#333] cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    setShowWebLink(true);
                    setOpenAddMenu(false);
                  }}
                >
                  <FaLink className="text-purple-400" />
                  <span className="text-sm text-gray-200">Web Link</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {uploadError && (
          <div id="upload-error" className="text-red-500 text-sm">
            {uploadError}
          </div>
        )}
        {attachments.length > 0 && (
          <div className="text-sm text-gray-200">
            {attachments.length} file{attachments.length > 1 ? "s" : ""} selected
          </div>
        )}

        {/* <StatusDropdown selectedStatus={taskStatus} onSelect={setTaskStatus} /> */}
        <Field name="status">
  {({ field }: any) => (
    <div className="flex flex-col gap-2">
      <StatusDropdown
        selectedStatus={field.value}
        onSelect={(status: string) => {
          field.onChange({ target: { name: "status", value: status } });
          updateTaskByOnchange({taskStatus : status });
        }}
      />
      {/* <ErrorMessage name="status" component="div" className="text-red-500 text-sm" /> */}
    </div>
  )}
</Field>
    

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-200">Description</label>
          <Field name="description">
            {({ field }: any) => (
              <EditableTextField
                {...field}
                placeholder="Enter task description"
                variant="outlined"
                fullWidth
                size="small"
                multiline
                rows={4}
                displayClassName="bg-[#0D0F11] p-2 rounded-sm cursor-pointer text-gray-200"
                showButtons={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e);
                }}
                onConfirm={(value: string) => {
                  updateTaskByOnchange({ description: value });
                }}
              />
            )}
          </Field>
        </div>

        {attachments.length > 0 && (
          <div className="text-sm font-medium text-gray-200">Attachments</div>
        )}
        <TaskPreview
          attachments={attachments}
          fileUrls={fileUrls}
          handleDeleteAttachment={handleDeleteAttachment}
        />

        {showChildIssueFields && (
          <ChildIssueFields onCancel={() => setShowChildIssueFields(false)} />
        )}

        {showWebLink && <WebLinkFields onCancel={() => setShowWebLink(false)} />}

        <div className="border border-neutral-700 p-4 rounded-sm">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowDetails(!showDetails)}
          >
            <h2 className="text-sm font-medium text-gray-200">Details</h2>
            <span>{showDetails ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</span>
          </div>
          {showDetails && (
            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <label className="w-40 text-sm text-gray-200">Assignee</label>
                <Field name="assignee">
                    {({ field }: any) => (
                      <AssigneeDropdown
                        members={members}
                        selectedAssignee={field.value}
                        onSelect={(assigneeId: string) => {
                          setSelectedAssignee(assigneeId);
                          field.onChange({ target: { name: "assignee", value: assigneeId } });
                          updateTaskByOnchange({ assignee: assigneeId });
                        }}
                      />
                    )}
                  </Field>
              </div>
               <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-200">Parent</label>
                  <Field name="parent">
                    {({ field }: any) => (
                      <ParentDropdown
                      epics={defaultEpics}
                      selectedParent={field.value}
                      onSelect={(parentId: string) => {
                        field.onChange({ target: { name: "parent", value: parentId } });
                        updateTaskByOnchange({ parent: parentId });
                      }}
                    />
                     
                    )}
                  </Field>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-200">Start Date</label>
                  <Field name="startDate">
                    {({ field }: any) => (
                      <EditableTextField
                        {...field}
                        type="date"
                        placeholder="None"
                        variant="outlined"
                        fullWidth
                        size="small"
                        displayClassName="p-2 rounded-sm cursor-pointer text-gray-200"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange(e);
                          updateTaskByOnchange({ startDate: e.target.value });
                        }}
                      />
                    )}
                  </Field>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-200">Due Date</label>
                  <Field name="dueDate">
                    {({ field }: any) => (
                      <EditableTextField
                        {...field}
                        type="date"
                        placeholder="None"
                        variant="outlined"
                        fullWidth
                        size="small"
                        displayClassName="p-2 rounded-sm cursor-pointer text-gray-200"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange(e);
                          updateTaskByOnchange({ dueDate: e.target.value });
                        }}
                      />
                    )}
                  </Field>
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-40 text-sm text-gray-200">Reporter</label>
                   <Field name="reporter">
                  {({ field }: any) => (
                    <ReporterDropdown
                    members={members}
                    selectedReporter={field.value}
                    onSelect={(reporterId: string) => {
                      field.onChange({ target: { name: "reporter", value: reporterId } });
                      updateTaskByOnchange({ reporter: reporterId });
                    }}
                  />
                  )}
                </Field>
                </div>
            </div>
          )}
        </div>

      </Form>
    </Formik>
  );
};

export default TaskForm;