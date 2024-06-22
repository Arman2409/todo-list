import { createSlice, Slice } from "@reduxjs/toolkit";

import type { ModalStatus } from "../../../types/store/uiSlice";

interface InitialState {
    modalStatus: ModalStatus
    editId: string
}

const initialState: InitialState = {
    modalStatus: undefined,
    editId: ""
}

const uiSlice: Slice = createSlice({
    name: "demoSlice",
    initialState,
    reducers: {
        changeModalStatus: (state, { payload }: { payload: ModalStatus }) => {
            state.modalStatus = payload;
        },
        changeEditId: (state, { payload }: { payload: ModalStatus }) => {
            state.editId = payload;
        }
    },
});

export const { changeModalStatus, changeEditId } = uiSlice.actions;
export default uiSlice.reducer;