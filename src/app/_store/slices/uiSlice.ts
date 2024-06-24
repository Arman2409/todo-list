import { createSlice, Slice } from "@reduxjs/toolkit";

import type { StatusAction, UIInitialState } from "../../../types/store/uiSlice";
import type { DeleteAction } from "../../../types/store/tasksSlice";

const initialState: UIInitialState = {
    modalStatus: undefined,
    activeId: ""
}

const uiSlice: Slice = createSlice({
    name: "demoSlice",
    initialState,
    reducers: {
        changeModalStatus: (
            state, 
            { payload }: StatusAction
        ) => {
            state.modalStatus = payload;
        },
        // Keep the active id for delete, complete, etc.  
        changeActiveId: (
            state, 
            { payload }: DeleteAction
        ) => {
            state.activeId = payload;
        }
    },
});

export const { changeModalStatus, changeActiveId } = uiSlice.actions;
export default uiSlice.reducer;