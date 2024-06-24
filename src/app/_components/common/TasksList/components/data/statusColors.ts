import { TaskStatus } from "../../../../../../types/store/tasksSlice";

const statusColors: Map<TaskStatus, string> = new Map([
    ["pending", "yellow"],
    ["completed", "green"],
    ["overdue", "red"],
    ["removed", "gray"],
]);

export default statusColors;