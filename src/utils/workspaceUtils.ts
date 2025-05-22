import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { getuserDetilasApi } from "../services/profileDetilasService";
import { setSelectWorkspace, setSelectWorkspaceId } from "../redux/workspaceSlice";
import { getAllProjectsApi } from "../services/projectService";
import { setAllProjects } from "../redux/projectSlice";


export const handleWorkspaceSelection = async (
  dispatch: Dispatch,
  navigate: NavigateFunction
) => {
  try {
    // console.log("checking user have the workspace")
    const userWorkSpace = await getuserDetilasApi();
    // console.log("userWorkspace get successfully", userWorkSpace)
    const invitedWorkspace = userWorkSpace?.data?.invitedWorkspace;
    const myworkspace = userWorkSpace?.data?.workspaceOwn;

    const workspaceId = myworkspace?._id || invitedWorkspace[0]?._id;

    const projectsResponse = await getAllProjectsApi(workspaceId)
    // console.log("getAllprojects in the workspace util", projectsResponse)
  

    if (myworkspace) {
      dispatch(setSelectWorkspaceId(myworkspace._id));
      dispatch(setSelectWorkspace(myworkspace));
      const projectList = projectsResponse?.data?.data ?? [];
      dispatch(setAllProjects(projectList));
    } else if (invitedWorkspace.length > 0) {
      dispatch(setSelectWorkspaceId(invitedWorkspace[0]._id));
      dispatch(setSelectWorkspace(invitedWorkspace[0]));
    }
    // console.log("myworkspace and invitedWorkspace", myworkspace, invitedWorkspace)
    navigate(myworkspace || invitedWorkspace.length > 0 ? "/project" : "/create-work-space");
  } catch (error) {
    console.error("Failed to fetch the workspace", error);
    navigate("/create-work-space");
  }
};
