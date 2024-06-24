import getNextDay from "../helpers/getNextDay";

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