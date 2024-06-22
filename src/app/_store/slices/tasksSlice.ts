import { createSlice, Slice } from "@reduxjs/toolkit";

import type { ModalStatus } from "../../../types/store/uiSlice";

export interface Task {
    id: string,
    name: string;
    description?: string;
    deadline?: Date;
    completed?: boolean;
    removed?: boolean; // Optional for handling removed tasks
}

interface InitialState {
    tasks: Task[]
}

const initialState: InitialState = {
    tasks: [
        {
            id: "1",
            name: "test task",
            description: "test description",
            deadline: new Date()
        }
    ]
}

const tasksSlice: Slice = createSlice({
    name: "tasksSlice",
    initialState,
    reducers: {
        addTask: (state, { payload }: { payload: ModalStatus }) => {
            state.tasks = [...state.tasks, payload];
        },
        deleteTask: (state, { payload }: { payload: ModalStatus }) => {
            state.tasks = state.tasks.filter(({id}:Task) => id !== payload);
        },

    },
});

export const { addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;