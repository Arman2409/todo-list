export type TaskStatus =  "pending" | "completed" | "overdue" | "removed"

export interface Task {
    id: string
    name: string
    description?: string
    deadline?: Date
    status: TaskStatus
}

export interface TasksInitialState {
    tasks: Task[]
    trash: Task[]
}

export interface AddAction {
    payload: Task
}

export interface ChangeStatusAction {
    payload: {
        id: string,
        status: string
    }
}

export interface DeleteAction {
    payload: string
}