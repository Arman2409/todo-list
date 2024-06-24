import getNextDay from "../helpers/getNextDay";

export const statusPriorities = { overdue: 0, pending: 1, completed: 2 };

export const defaultTasks = [
    {
        id: "1",
        name: "Need to finish task",
        description: "My note details",
        deadline: getNextDay(new Date()),
        status: "pending"
    },
    {
        id: "2",
        name: "Completed task",
        description: "My note details",
        deadline: getNextDay(new Date()),
        status: "completed"
    },
]