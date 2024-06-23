import { createSlice, Slice } from "@reduxjs/toolkit";

import type { ModalStatus, UIInitialState } from "../../../types/store/uiSlice";

const initialState: UIInitialState = {
    modalStatus: undefined,
    activeId: ""
}

const uiSlice: Slice = createSlice({
    name: "demoSlice",
    initialState,
    reducers: {
        changeModalStatus: (state, { payload }: { payload: ModalStatus }) => {
            state.modalStatus = payload;
        },
        changeActiveId: (state, { payload }: { payload: ModalStatus }) => {
            state.activeId = payload;
        }
    },
});

export const { changeModalStatus, changeActiveId } = uiSlice.actions;
export default uiSlice.reducer;