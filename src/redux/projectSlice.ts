import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Project {
    _id: string;
    name: string;
    projectkey: string;
    description: string;
    workspace: any;
    owner: any;
    members: any[];
    createdAt: string;
}

interface ProjectState {
    selectedProject: Project | null;
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
        setSelectProject: (state, action: PayloadAction<Project>) => {
            state.selectedProject = action.payload;
        },
        setSelectProjectId: (state, action: PayloadAction<string>) => {
            state.selectedProjectId = action.payload;
        },
        setAllProjects: (state, action: PayloadAction<Project[]>) => {
            state.allProjects = action.payload
        }
    }
})


export const {setSelectProject, setSelectProjectId, setAllProjects} = projectSlice.actions
export default projectSlice.reducer;