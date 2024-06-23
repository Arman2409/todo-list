import type { FormikContextType } from "formik/dist/types";

import type { TaskValues } from "../app/_components/common/ActionModal.tsx/schemas/taskSchema";
import { ReactElement } from "react";

export interface ModalButtonsProps { 
    isConfirm: boolean
    modalTitle: string
    closeModal:Function 
    submit: Function 
 }
 
export interface ModalInputsProps {
    formik: FormikContextType<TaskValues>
 }
 
export interface LoadingProps { 
    windowLoad: boolean 
}

export interface PageData {
    title: string,
    icon: ReactElement
}