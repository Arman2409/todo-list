import type { FormikContextType } from "formik";

import type { TaskValues } from "../../app/_components/common/ActionModal.tsx/schemas/taskSchema";
import type { Task } from "../store/tasksSlice";
import type { ModalStatus } from "../store/uiSlice";

export interface TaskItemProps extends Task {
   isTrash: boolean
}

export interface UseSubmitProps {
   modalStatus: ModalStatus
   activeId: string
   formik: FormikContextType<TaskValues>
   closeModal: () => void;
 }