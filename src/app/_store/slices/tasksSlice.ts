import { createSlice, Slice } from "@reduxjs/toolkit";

import type { TasksInitialState, Task } from "../../../types/store/tasksSlice";

const initialState: TasksInitialState = {
    tasks: [
        {
            id: "1",
            name: "test task",
            description: "test description",
            deadline: new Date(),
            status: "pending"
        }
    ],
    trash: []
}

const tasksSlice: Slice = createSlice({
    name: "tasksSlice",
    initialState,
    reducers: {
        addTask: (state, { payload }: { payload: Task }) => {
            state.tasks = [...state.tasks, {
                ...payload,
                status: "pending"
            }];
        },
        editTask: (state, { payload }: { payload: Task }) => {
            state.tasks = state.tasks.map((task: Task) => {
                if (payload.id === task.id) return payload;
                return task;
            });
        },
        completeTask: (state, { payload }: { payload: string }) => {
            state.tasks = state.tasks.map((task: Task) => {
                if (task.id === payload) {
                    return {
                        ...task,
                        status: "completed"
                    }
                }
                return task
            });
        },
        deleteTask: (state, { payload }: { payload: string }) => {
            state.tasks = state.tasks.filter((task: Task) => {
                if (task.id !== payload) {
                    return true;
                }
                state.trash = [...state.trash, {
                    ...task,
                    status: "removed"
                }];
                return false;
            });
        },
    },
});

export const { addTask, editTask, completeTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;