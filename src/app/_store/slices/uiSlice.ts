import { createSlice, Slice } from "@reduxjs/toolkit";

import type { ModalStatus } from "../../../types/store/uiSlice";

interface InitialState {
    modalStatus: ModalStatus
}

const initialState: InitialState = {
    modalStatus: undefined
}

const uiSlice: Slice = createSlice({
    name: "demoSlice",
    initialState,
    reducers: {
        changeModalStatus: (state, { payload }: {payload: ModalStatus}) => {
            console.log(payload);
            
           state.modalStatus = payload;
        }
    },
});

export const { changeModalStatus } = uiSlice.actions;
export default uiSlice.reducer;