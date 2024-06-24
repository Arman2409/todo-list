import { object, string, date } from "yup";
import type { InferType } from "yup";

const TaskSchema = object({
    name: string().required(),
    description: string().required(),
    deadline: date()
    .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .required('Deadline is required.'),
})

// Get and export the type of schema for further use 
export type TaskValues = InferType<typeof TaskSchema>
export default TaskSchema;