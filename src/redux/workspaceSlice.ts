import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface WorkspaceState {
    selectWorkspaceId: string | null;
    selectWorkspace: any | null;
}

const initialState: WorkspaceState = {
    selectWorkspaceId: null,
    selectWorkspace: null,
}

const workspaceSlice = createSlice({
    name: "workspace",
    initialState,
    reducers: {
        setSelectWorkspaceId(state, action: PayloadAction<string | null>){
            state.selectWorkspaceId = action.payload;
        },
        setSelectWorkspace(state, action: PayloadAction<any | null>){
            state.selectWorkspace = action.payload;
        }
    }
})

export const {setSelectWorkspaceId, setSelectWorkspace} = workspaceSlice.actions;
export default workspaceSlice.reducer;