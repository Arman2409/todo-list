type TaskStatus =  "pending" | "completed" | "overdue" | "removed"

export interface TasksInitialState {
    tasks: Task[]
    trash: Task[]
}

export interface Task {
    id: string
    name: string
    description?: string
    deadline?: Date
    status: TaskStatus
}
