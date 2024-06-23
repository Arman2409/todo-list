import type { Task } from "../store/tasksSlice";

export interface TaskItemProps extends Task {
   isTrash: boolean
}