import { object, string, date } from "yup";
import type { InferType } from "yup";

const TaskSchema = object({
    name: string().required(),
    deadline: date(),
    description: string(),
})

export type TaskValues = InferType<typeof TaskSchema>
export default TaskSchema;