import { createSlice, Slice } from "@reduxjs/toolkit";

import { defaultTask } from "../../../configs/tasks";
import type { TasksInitialState, Task, AddAction, ChangeStatusAction, DeleteAction } from "../../../types/store/tasksSlice";

const initialState: TasksInitialState = {
    tasks: [defaultTask as Task],
    trash: []
}

const tasksSlice: Slice = createSlice({
    name: "tasksSlice",
    initialState,
    reducers: {
        addTask: (
            state,
            { payload }: AddAction
        ) => {
            state.tasks = [...state.tasks, {
                ...payload,
                status: "pending"
            }];
        },
        editTask: (
            state,
            { payload }: AddAction
        ) => {
            state.tasks = state.tasks.map((task: Task) => {
                if (payload.id === task.id) {
                    return payload
                };
                return task;
            });
        },
        changeTaskStatus: (
            state,
            { payload }: ChangeStatusAction
        ) => {
            console.log("change", payload.status);
            
            const { id, status } = { ...payload };
            state.tasks = state.tasks.map((task: Task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        status
                    }
                }
                return task
            });
            console.log(state.tasks);
            
        },
        deleteTask: (
            state,
            { payload }: DeleteAction
        ) => {
            state.tasks = state.tasks.filter((task: Task) => {
                if (task.id !== payload) {
                    return true;
                }
                // Add the task to the trash 
                state.trash = [...state.trash, {
                    ...task,
                    status: "removed"
                }];
                return false;
            });
        },
        restoreTask: (
            state,
            { payload }: DeleteAction
        ) => {
            state.trash = state.trash.filter((trashItem: Task) => {
                if (trashItem.id === payload) {
                    // Add the task
                    state.tasks = [...state.tasks, {
                        ...trashItem,
                        status: "pending"
                    }];
                    return false;
                }
                return true;
            })
        },
    },
});

export const { addTask, editTask, changeTaskStatus, restoreTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;