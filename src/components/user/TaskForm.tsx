import {IoAdd} from "react-icons/io5";
import {FaLink, FaPaperclip} from "react-icons/fa";
import {BsListNested} from "react-icons/bs";
import {RiArrowDownSLine, RiArrowUpSLine} from "react-icons/ri";
import {useState} from "react";
import {Formik, Form, Field} from "formik";
import EditableTextField from "./EditableTextField";
import TaskPreview from "./TaskPreview";
import StatusInput from "./StatusInput";
import useFileHandler from "../../hooks/useFileHandler";

interface TaskFormProps {
  epicTitle: string;
  onClose: () => void;
  epicId: string;
}

interface TaskFormValues {
  title: string;
  description: string;
  assignee: string;
  parent: string;
  startDate: string;
  dueDate: string;
  reporter: string;
  webLinkUrl: string;
  webLinkText: string;
}

const statusOptions = {
  "To Do": {
    textColor: "text-gray-400",
    bgColor: "bg-gray-800",
    hoverBg: "hover:bg-gray-700",
  },
  "In Progress": {
    textColor: "text-blue-400",
    bgColor: "bg-blue-900",
    hoverBg: "hover:bg-blue-800",
  },
  Done: {
    textColor: "text-green-400",
    bgColor: "bg-green-900",
    hoverBg: "hover:bg-green-800",
  },
};


const TaskForm: React.FC<TaskFormProps> = ({epicTitle, onClose, epicId}) => {
  const [openAddTasks, setOpenAddTasks] = useState(false);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [showChildIssueFields, setShowChildIssueFields] = useState(false);
  const [showWebLink, setShowWebLink] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [status, setStatus] = useState("TO_DO");
  const [task, setTask] = useState("");
  const {
    attachments,
    fileUrls,
    uploadError,
    handleFileChange,
    handleDeleteAttachment,
  } = useFileHandler(() => {
    setOpenAddTasks(false);
  });

  const handleOpenAddTasks = () => {
    setOpenAddTasks(!openAddTasks);
  };

  const toggleStatusDropdown = () => {
    setOpenStatusDropdown(!openStatusDropdown);
  };

  const handleStatusChange = (status: string) => {
    setTaskStatus(status);
    setOpenStatusDropdown(false);
  };

  const initialValues: TaskFormValues = {
    title: epicTitle,
    description: "",
    assignee: "",
    parent: "",
    startDate: "",
    dueDate: "",
    reporter: "",
    webLinkUrl: "",
    webLinkText: "",
  };

//api call for updating the epic task
  const handleTaskSubmit = (
    values: TaskFormValues,
    taskStatus: string,
    onClose: () => void
  ) => {
    console.log("Form submitted with values:", {...values, status: taskStatus});
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleTaskSubmit(values, taskStatus, onClose)}
    >
      <Form className="flex flex-col gap-3.5">
        <Field name="title">
          {({field}: any) => (
            <EditableTextField
              {...field}
              placeholder="Project Name"
              variant="outlined"
              fullWidth
              size="small"
              displayClassName="text-2xl font-semibold cursor-pointer"
            />
          )}
        </Field>

        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1 bg-[#0D0F11] py-1.5 px-3 rounded-sm cursor-pointer"
            onClick={handleOpenAddTasks}
          >
            <span>
              <IoAdd size={20} />
            </span>
            <span>Add</span>
          </button>
          {openAddTasks && (
            <div className="absolute left-0 top-full mt-1 bg-[#262626] py-1 rounded shadow-sm min-w-[180px] z-50 animate-fadeIn">
              <ul>
                <li className="flex items-center gap-3 px-4 py-2 hover:bg-[#333] cursor-pointer transition-colors duration-150 relative">
                  <label className="flex items-center gap-3 w-full cursor-pointer">
                    <FaPaperclip className="text-blue-400" />
                    <span>Attachment</span>
                    <input
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      aria-label="Upload attachments"
                    />
                  </label>
                </li>
                <li
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#333] cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    setShowChildIssueFields(true);
                    setOpenAddTasks(false);
                  }}
                >
                  <BsListNested className="text-green-400" />
                  <span>Child Issue</span>
                </li>
                <li
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[#333] cursor-pointer transition-colors duration-150"
                  onClick={() => {
                    setShowWebLink(true);
                    setOpenAddTasks(false);
                  }}
                >
                  <FaLink className="text-purple-400" />
                  <span>Web Link</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {uploadError && (
          <div className="text-red-500 text-sm">{uploadError}</div>
        )}

        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-1 bg-[#0D0F11] py-1.5 px-3 rounded-sm cursor-pointer justify-between"
            onClick={toggleStatusDropdown}
          >
            <span>{taskStatus}</span>
            <RiArrowDownSLine size={18} />
          </button>
          {openStatusDropdown && (
            <div className="absolute left-0 top-full mt-1 bg-[#262626] py-1 rounded shadow-sm z-50">
              {Object.entries(statusOptions).map(([status, styles]) => (
                <div
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className="px-4 py-2 cursor-pointer transition-colors duration-150 hover:bg-[#333]"
                >
                  <p
                    className={`${styles.textColor} ${styles.bgColor} px-2 rounded-full text-center`}
                  >
                    {status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Description</label>
          <Field name="description">
            {({field}: any) => (
              <EditableTextField
                {...field}
                placeholder="Enter task description"
                variant="outlined"
                fullWidth
                size="small"
                multiline
                rows={4}
                displayClassName="bg-[#0D0F11] p-2 rounded-sm cursor-pointer"
                showButtons={true}
              />
            )}
          </Field>
        </div>

        {attachments.length > 0 && <div>Attachments</div>}
        <TaskPreview
          attachments={attachments}
          fileUrls={fileUrls}
          handleDeleteAttachment={handleDeleteAttachment}
        />

        {showChildIssueFields && (
          <>
            <div>Child Issue</div>
            <div className="flex gap-2">
              <StatusInput
                statusValue={status}
                taskValue={task}
                onStatusChange={setStatus}
                onTaskChange={setTask}
                placeholder="Enter task details"
                statusOptions={[
                  {value: "STORY", label: "Story"},
                  {value: "TASK", label: "Task"},
                  {value: "BUG", label: "Bug"},
                ]}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button className="bg-blue-400 px-2 py-0.5 rounded-xs cursor-pointer">
                Create
              </button>
              <button
                className="bg-[#43414197] px-2 py-0.5 rounded-xs cursor-pointer"
                onClick={() => {
                  setShowChildIssueFields(false);
                  setOpenAddTasks(false);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {showWebLink && (
          <>
            <div>Web Link</div>
            <div className="flex gap-2">
               <Field name="webLinkUrl">
                  {({ field }: any) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full h-9 text-sm px-2 bg-[#222] text-[#DDD] border border-[#444] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-[#888] placeholder-opacity-100 rounded outline-none transition-colors duration-150"
                      placeholder="https://example.com"
                      onChange={(e) => {
                        console.log('webLinkUrl change:', e.target.value);
                        field.onChange(e);
                      }}
                    />
                  )}
                </Field>

                <Field name="webLinkText">
                  {({ field }: any) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full h-9 text-sm px-2 bg-[#222] text-[#DDD] border border-[#444] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-[#888] placeholder-opacity-100 rounded outline-none transition-colors duration-150"
                      placeholder="Add description"
                      onChange={(e) => {
                        console.log('webLinkText change:', e.target.value);
                        field.onChange(e);
                      }}
                    />
                  )}
                </Field>
            </div>
            <div className="flex gap-2 justify-end">
              <button className="bg-blue-400 px-2 py-0.5 rounded-xs cursor-pointer">
                Create
              </button>
              <button
                className="bg-[#43414197] px-2 py-0.5 rounded-xs cursor-pointer"
                onClick={() => {
                  setShowWebLink(false);
                  setOpenAddTasks(false);
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {/*  */}
        <div className="border border-neutral-700 p-4 rounded-sm">
          <div>
            <div
              className="flex justify-between items-center"
              onClick={() => setShowDetails(!showDetails)}
            >
              <h2>Details</h2>
              <span>
                {showDetails ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
              </span>
            </div>
            {showDetails && (
              <div className="mt-3">
                <div className="flex items-center">
                  <label className="w-40">Assigne</label>
                  <Field name="assigned">
                    {({field}: any) => (
                      <EditableTextField
                        {...field}
                        placeholder="None"
                        variant="outlined"
                        fullWidth
                        size="small"
                        multiline
                        displayClassName="p-2 rounded-sm cursor-pointer"
                      />
                    )}
                  </Field>
                </div>

                <div className="flex items-center">
                  <label className="w-40">Parent</label>
                  <Field name="parent">
                    {({field}: any) => (
                      <EditableTextField
                        {...field}
                        placeholder="None"
                        variant="outlined"
                        fullWidth
                        size="small"
                        multiline
                        displayClassName="p-2 rounded-sm cursor-pointer"
                      />
                    )}
                  </Field>
                </div>

                <div className="flex items-center">
                  <label className="w-40">Start Date</label>
                  <Field name="startDate">
                    {({field}: any) => (
                      <EditableTextField
                        {...field}
                        placeholder="None"
                        variant="outlined"
                        fullWidth
                        size="small"
                        multiline
                        displayClassName="p-2 rounded-sm cursor-pointer"
                      />
                    )}
                  </Field>
                </div>

                <div className="flex items-center">
                  <label className="w-40">Due Date</label>
                  <Field name="dueDate">
                    {({field}: any) => (
                      <EditableTextField
                        {...field}
                        placeholder="None"
                        variant="outlined"
                        fullWidth
                        size="small"
                        multiline
                        displayClassName="p-2 rounded-sm cursor-pointer"
                      />
                    )}
                  </Field>
                </div>

                <div className="flex items-center">
                  <label className="w-40">Reporter</label>
                  <Field name="webLinkText">
                    {({field}: any) => (
                      <EditableTextField
                        {...field}
                        placeholder="None"
                        variant="outlined"
                        fullWidth
                        size="small"
                        multiline
                        displayClassName="p-2 rounded-sm cursor-pointer"
                      />
                    )}
                  </Field>
                </div>
              </div>
            )}
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default TaskForm;
