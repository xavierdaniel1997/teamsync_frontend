import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject } from "../types/project";

interface Project {
    _id: string;
    name: string;
    projectkey: string;
    projectCoverImg: string;
    description: string;
    workspace: any;
    // color: string;
    color: { class: string, hex: string };
    owner: any;
    members: any[];
    createdAt: string;
}

interface ProjectState {
    selectedProject: IProject | null;
    selectedProjectId: string | null;
    allProjects: Project[];
}


const initialState: ProjectState = {
    selectedProject: null,
    selectedProjectId: null,
    allProjects: [],
};

const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        setSelectProject: (state, action: PayloadAction<IProject | null>) => {
            state.selectedProject = action.payload;
        },
        setSelectProjectId: (state, action: PayloadAction<string | null>) => {
            state.selectedProjectId = action.payload;
        },
        setAllProjects: (state, action: PayloadAction<Project[]>) => {
            state.allProjects = action.payload
        }
    }
})


export const {setSelectProject, setSelectProjectId, setAllProjects} = projectSlice.actions
export default projectSlice.reducer;