export type ModalStatus = "editing" | "adding" | "deleting" | "completing" | "restoring" | undefined

export interface UIInitialState {
    modalStatus: ModalStatus
    activeId: string
}

export interface StatusAction {
    payload: ModalStatus
}