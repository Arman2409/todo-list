import type { ModalStatus } from "../../../../../types/store/uiSlice";

const titles: Map<ModalStatus, string> = new Map([
    ['editing', "Edit Task"],
    ['adding', "Add Task"],
    ['deleting', "Delete Task"],
    ['completing', "Complete Task"],
    ['restoring', "Restore Task"],
]);

export default titles;