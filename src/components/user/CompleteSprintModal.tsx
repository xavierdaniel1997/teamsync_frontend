import { Dialog, DialogContent } from "@mui/material";
import { IoClose } from "react-icons/io5";
import React, { useState } from "react";
import { IUser } from "../../types/users";
import UserAvatar from "../globa/UserAvatar";
import { getInitials, getRandomColor } from "../../utils/userHelpers";
import { ISprint } from "../../types/sprint";
import { useProject } from "../../hooks/useProject";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface CompleteSprintModalProps {
  isOpen: boolean;
  onClose: () => void;

  sprintId: string;
  sprintName: string;
  startDate: string;
  endDate: string;

  totalIssues: number;
  doneIssues: number;
  notDoneIssues: number;

  assigneeSummary?: IUser[];
  sprintData: ISprint[];

  hasNextSprint: boolean;
  onConfirm: (moveIncompleteTo: "BACKLOG" | "NEXT_SPRINT") => void;
}

const CompleteSprintModal: React.FC<CompleteSprintModalProps> = ({
  isOpen,
  onClose,
  sprintId,
  sprintName,
  startDate,
  endDate,
  totalIssues,
  doneIssues,
  notDoneIssues,
  assigneeSummary = [],
  hasNextSprint,
  sprintData,
}) => {
  const [moveOption, setMoveOption] = useState<"BACKLOG" | "NEXT_SPRINT">(
    hasNextSprint ? "NEXT_SPRINT" : "BACKLOG"
  );
  const [selectedSprintId, setSelectedSprintId] = useState<string | null>(null);
  const workspaceId = useSelector((state: RootState) => state.workspace.selectWorkspaceId);
  const projectId = useSelector((state: RootState) => state.project.selectedProjectId);

  const { useCompleteSprint } = useProject();

//   const handleCompleteSprint = () => {
//   if (moveOption === "NEXT_SPRINT" && !selectedSprintId) {
//     toast.error("Please select a sprint");
//     return;
//   }

//   if(!workspaceId || !projectId || !sprintId){
//     return;
//   }

//   useCompleteSprint.mutate({
//     workspaceId,
//     projectId,
//     sprintId,
//     moveIncompleteTo: moveOption,
//     targetSprintId:
//       moveOption === "NEXT_SPRINT" ? selectedSprintId! : undefined,
//   });

//   onClose();
// };


const handleCompleteSprint = () => {
  if (!workspaceId || !projectId || !sprintId) return;

  const payload: {
    workspaceId: string;
    projectId: string;
    sprintId: string;
    moveIncompleteTo?: "BACKLOG" | "NEXT_SPRINT";
    targetSprintId?: string;
  } = {
    workspaceId,
    projectId,
    sprintId,
  };

  if (notDoneIssues > 0) {
    if (moveOption === "NEXT_SPRINT" && !selectedSprintId) {
      toast.error("Please select a sprint");
      return;
    }

    payload.moveIncompleteTo = moveOption;

    if (moveOption === "NEXT_SPRINT") {
      payload.targetSprintId = selectedSprintId!;
    }
  }

  useCompleteSprint.mutate(payload);
  onClose();
};



  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#191919",
          color: "white",
          paddingBottom: 1,
          borderRadius: 1,
          overflow: "hidden",
          maxHeight: "80vh",
        },
      }}
    >
      <DialogContent className="dialog-scrollbar">
        <div className="text-gray-300">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Complete Sprint</h1>
            <button onClick={onClose}>
              <IoClose size={20} />
            </button>
          </div>

          {/* Sprint Info */}
          <div className="mt-3 text-sm text-gray-400">
            <p className="font-medium text-white">{sprintName}</p>
            <p>
              {startDate} → {endDate}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#131313] border border-[#2f2f2f] rounded p-3">
              <p className="text-lg font-semibold">{totalIssues}</p>
              <p className="text-xs text-gray-400">Planned</p>
            </div>
            <div className="bg-[#131313] border border-[#2f2f2f] rounded p-3">
              <p className="text-lg font-semibold text-green-400">
                {doneIssues}
              </p>
              <p className="text-xs text-gray-400">Completed</p>
            </div>
            <div className="bg-[#131313] border border-[#2f2f2f] rounded p-3">
              <p className="text-lg font-semibold text-red-400">
                {notDoneIssues}
              </p>
              <p className="text-xs text-gray-400">Not completed</p>
            </div>
          </div>

          {/* Who worked on what (optional v1) */}
          {assigneeSummary.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-white mb-2">
                Work completed by
              </p>
              <div className="space-y-2">
                {assigneeSummary.map((user) => (
                  <div
                    key={user._id}
                    className="flex justify-between text-sm bg-[#131313] border border-[#2f2f2f] rounded px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <UserAvatar
                        user={user || null}
                        width={6}
                        height={6}
                        getRandomColor={getRandomColor}
                        getInitials={getInitials}
                      />
                      <span>{user.fullName}</span>
                    </div>
                    <span className="text-green-400">
                      {user.completedIssues} done
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decision for unfinished work */}
          {notDoneIssues > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-white mb-2">
                Move unfinished work to
              </p>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={moveOption === "BACKLOG"}
                    onChange={() => setMoveOption("BACKLOG")}
                  />
                  <span className="text-sm">Backlog</span>
                </label>

                <label
                  className={`flex items-center gap-2 ${
                    hasNextSprint ? "cursor-pointer" : "opacity-50"
                  }`}
                >
                  <input
                    type="radio"
                    disabled={!hasNextSprint}
                    checked={moveOption === "NEXT_SPRINT"}
                    onChange={() => setMoveOption("NEXT_SPRINT")}
                  />
                  <span className="text-sm">Next sprint</span>
                </label>
              </div>

              {moveOption === "NEXT_SPRINT" && (
                <div className="flex items-center gap-3 text-xs">
                  {sprintData.filter((sprint) => sprint.status === "PLANNED").map((sprint: ISprint) => (
                    <div key={sprint._id} className="flex flex-row gap-2">
                      <input
                        type="radio"
                        className="accent-gray-600 rounded border-gray-600"
                        checked={selectedSprintId === sprint._id}
                        onChange={() => setSelectedSprintId(sprint._id)}
                      />
                      <p>{sprint.sprintName}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer actions */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="hover:bg-[#6f6f6f45] px-3 py-1 rounded"
            >
              Cancel
            </button>

            <button
              // onClick={() => onConfirm(moveOption)}
              onClick={handleCompleteSprint}
              className="flex items-center space-x-1 bg-red-500/50 hover:bg-red-500/80  text-gray-300 px-3 py-1 rounded text-sm cursor-pointer"
            >
              Complete Sprint
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteSprintModal;
